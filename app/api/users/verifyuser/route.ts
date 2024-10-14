import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request:NextRequest) {
    const { token } = await request.json(); // Token sent from the frontend
  
    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }
  
    try {
      // Verify the JWT
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
      return NextResponse.json({ data: decoded });
    } catch (error:any) {
      console.error('JWT verification failed:', error.message);
      return NextResponse.json({message: 'Invalid or expired token'},{status:401})
    }
  }