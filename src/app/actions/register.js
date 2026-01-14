'use server';

import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Constants from '@/models/Constants';
import { registerSchema } from '@/lib/schemas';

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
  throw new Error('Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file');
}

cloudinary.config(cloudinaryConfig);

// function for referral trigger
async function triggerReferralIncrease(referralCode, retries = 3) {
  const serviceUrl = process.env.AMBASSADOR_SERVICE_URL;
  const apiKey = process.env.AMBASSADOR_API_KEY;

  if (!serviceUrl || !apiKey) {
    console.warn("Ambassador service URL or API Key is missing.");
    return;
  }

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`${serviceUrl}/api/ambassadors/referrals/increment`, {
        method: 'POST',
        body: JSON.stringify({ referralCode }),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (response.ok) {
        console.log(`Referral code ${referralCode} incremented successfully.`);
        return;
      }

      if (response.status === 429 && i < retries - 1) {
        const waitTime = 1000 * Math.pow(2, i);
        console.warn(`Rate limited (429). Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText.slice(0, 200) }; // Truncate HTML if it's a page
      }
      console.error('Failed to increment referral:', response.status, errorData);
      return;

    } catch (error) {
      console.error('Failed to trigger referral increase:', error);
      if (i < retries - 1) {
         await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
}

export async function verifyReferralCode(referralCode) {
  const serviceUrl = process.env.AMBASSADOR_SERVICE_URL;
  const apiKey = process.env.AMBASSADOR_API_KEY;

  if (!serviceUrl || !apiKey) {
    console.warn("Ambassador service URL or API Key is missing.");
    return { success: false, error: "Service configuration error" };
  }

  try {
    const response = await fetch(`${serviceUrl}/api/ambassadors/referrals/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ referralCode }),
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("Failed to parse verification response:", text);
      return { success: false, error: "Invalid server response" };
    }

    if (response.ok && data.success) {
      return { success: true, valid: true, data: data.data };
    } else {
      return { success: false, valid: false, error: data.error || `Verification failed (${response.status})` };
    }
  } catch (error) {
    console.error("Error verifying referral code:", error);
    return { success: false, error: "Network error during verification" };
  }
}

export async function registerUser(formData) {
  try {
    await dbConnect();

    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      whatsappNumber: formData.get('whatsappNumber'),
      collegeName: formData.get('collegeName'),
      yearOfStudy: formData.get('yearOfStudy'),
      workshop: 'NOT-DECIDED', // Enforce default value
      attendedBefore: formData.get('attendedBefore'),
      foodPreference: formData.get('foodPreference'),
      referralSource: formData.get('referralSource'),
      referralCode: formData.get('referralCode'),
      upiTransactionId: formData.get('upiTransactionId'),
      amount: formData.get('amount'),
      paymentScreenshot: formData.get('paymentScreenshot'),
    };

    const validatedFields = registerSchema.omit({ paymentScreenshot: true }).safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const file = rawData.paymentScreenshot;
    if (!file || file.size === 0) {
        return { success: false, message: "Payment screenshot is required" };
    }
    
    if (file.size > 2 * 1024 * 1024) {
        return { success: false, message: "File size must be less than 2MB" };
    }

    // Check for existing user
    const existingUser = await User.findOne({ 
        $or: [
            { email: validatedFields.data.email },
            { upiTransactionId: validatedFields.data.upiTransactionId }
        ]
    });

    if (existingUser) {
        if (existingUser.email === validatedFields.data.email) {
            return { success: false, message: "Email already registered" };
        }
        if (existingUser.upiTransactionId === validatedFields.data.upiTransactionId) {
            return { success: false, message: "Transaction ID already used" };
        }
    }

    // Upload to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'spaceup-2025-registrations' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    if (validatedFields.data.referralCode) {
      await triggerReferralIncrease(validatedFields.data.referralCode);
    }

    // Save to MongoDB
    const newUser = await User.create({
      ...validatedFields.data,
      paymentScreenshotUrl: uploadResult.secure_url,
    });

    // Update registration count in Constants
    try {
      const constants = await Constants.findById('app_constants') || 
        await Constants.create({ _id: 'app_constants' });
      constants.registrationCount += 1;
      await constants.save();
    } catch (error) {
      console.error('Error updating registration count:', error);
      // Don't fail the registration if this fails
    }

    return { success: true, message: "Registration successful!" };

  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
