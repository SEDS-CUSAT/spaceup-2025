import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Constants from '@/models/Constants';

export const dynamic = 'force-dynamic';

export async function GET() {
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
