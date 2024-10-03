import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (request: Request, { params }: { params: any }) => {
    try {
      const name = params.id;
      const user = await User.findOne({ firstname:name });
      if (user) {
        return new NextResponse(
          JSON.stringify({ message: "User does exists", user: user }),
          { status: 200 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ message: "User does not exists", success: false }),
          { status: 400 }
        );
      }
    } catch (error) {
      return new NextResponse("error with featching users " + error, {status: 500});
    }
  };