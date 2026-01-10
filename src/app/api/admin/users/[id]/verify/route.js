import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Constants from '@/models/Constants';
import { withAdminAuth } from '@/lib/adminAuth';

async function handler(request, { params }) {
  try {
    const { id } = params;
    
    const { isVerified } = await request.json();

    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const wasVerified = user.isVerified;
    
    // Update user verification status
    user.isVerified = isVerified;
    user.verifiedAt = isVerified ? new Date() : null;
    await user.save();

    // Update constants count
    const constants = await Constants.findById('app_constants') || 
      await Constants.create({ _id: 'app_constants' });
    
    if (isVerified && !wasVerified) {
      constants.verifiedCount += 1;
    } else if (!isVerified && wasVerified) {
      constants.verifiedCount = Math.max(0, constants.verifiedCount - 1);
    }
    await constants.save();

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error verifying user:', error);
    return NextResponse.json(
      { error: 'Failed to update verification status' },
      { status: 500 }
    );
  }
}

export const PATCH = withAdminAuth(handler);
