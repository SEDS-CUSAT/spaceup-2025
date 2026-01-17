import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Constants from '@/models/Constants';
import { withAdminAuth } from '@/lib/adminAuth';

async function handler(request) {
  try {
    await connectDB();

    // Get or create constants
    let constants = await Constants.findById('app_constants');
    if (!constants) {
      constants = await Constants.create({ _id: 'app_constants' });
    }

    return NextResponse.json({
      success: true,
      constants
    });
  } catch (error) {
    console.error('Error fetching constants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch constants' },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);

async function putHandler(request) {
  try {
    await connectDB();
    const body = await request.json();

    const constants = await Constants.findByIdAndUpdate(
      'app_constants',
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      constants
    });
  } catch (error) {
    console.error('Error updating constants:', error);
    return NextResponse.json(
      { error: 'Failed to update constants' },
      { status: 500 }
    );
  }
}

export const PUT = withAdminAuth(putHandler);
