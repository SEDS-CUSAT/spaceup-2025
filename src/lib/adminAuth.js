import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this';

export async function verifyAdminToken(request) {
  try {
    // Try to get from cookie first (preferred)
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('admin_token');
    let token = tokenCookie?.value;

    // Fallback to Authorization header if no cookie
    if (!token) {
      const authHeader = request.headers.get('authorization');
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
    }

    if (!token) {
      return { valid: false, error: 'No token provided' };
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { valid: true, admin: decoded };
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return { valid: false, error: 'Token expired' };
      }
      return { valid: false, error: 'Invalid token' };
    }
  } catch (error) {
    return { valid: false, error: 'Authentication error' };
  }
}

export function withAdminAuth(handler) {
  return async (request, context) => {
    const verification = await verifyAdminToken(request);
    
    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error, requiresLogin: true },
        { status: 401 }
      );
    }
    
    // Add admin info to request
    request.admin = verification.admin;
    return handler(request, context);
  };
}
