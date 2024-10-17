import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig";
import { cookies } from "next/headers";
import User from "@/models/userModel";

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

export async function PATCH(request: NextRequest) {
  try {
    const { userId,ammount } = await request.json();
    // check if the userid is exist
    const userIdExist = await User.findOne({ firstname: userId });
    if (userIdExist) {
      return NextResponse.json(
        { message: "Demo Id is already assigned" },
        { status: 404 }
      );
    }

    const user = await User.findByIdAndUpdate(userId, { firstname: ammount, verifyed: true });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "User Verified" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "User Verify Failed" },
      { status: 401 }
    );
  }
}