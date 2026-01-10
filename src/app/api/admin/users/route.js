import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { withAdminAuth } from '@/lib/adminAuth';

async function handler(request) {
  try {
    await connectDB();

    // Get all users, sorted by creation date (newest first)
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      users,
      total: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
