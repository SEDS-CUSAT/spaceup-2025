'use server';

import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
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

// Placeholder function for referral trigger
async function triggerReferralIncrease(referralCode) {
  // TODO: Send POST request to API to increment referral count
  // try {
  //   await fetch('API_ENDPOINT', {
  //     method: 'POST',
  //     body: JSON.stringify({ code: referralCode }),
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // } catch (error) {
  //   console.error('Failed to trigger referral increase:', error);
  // }
  console.log(`Referral code used: ${referralCode}`);
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
      workshop: formData.get('workshop'),
      attendedBefore: formData.get('attendedBefore'),
      referralSource: formData.get('referralSource'),
      referralCode: formData.get('referralCode'),
      upiTransactionId: formData.get('upiTransactionId'),
      paymentScreenshot: formData.get('paymentScreenshot'),
    };

    // Validate fields (excluding file for now, or validate file metadata)
    // We can't easily validate the File object with Zod schema defined for client-side FileList
    // So we'll do manual validation or adjust schema.
    
    // Let's validate the text fields first
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

    return { success: true, message: "Registration successful!" };

  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
