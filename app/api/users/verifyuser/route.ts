import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig";
import { cookies } from "next/headers";

connect();

export async function POST(request: NextRequest) {
  try {
    // const { token } = await request.json(); // Token sent from the frontend
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    
    console.log(token);
    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    // Verify the JWT
    const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET!);
    return NextResponse.json({ data: decoded });

  } catch (error: any) {
    console.error("JWT verification failed:", error.message);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
