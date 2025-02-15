import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export const GET = async () => {
    try {
      const users = await User.find().sort({ status: -1, deadline: 1});
      return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error: any) {
      return new NextResponse("error with featching users " + error, {
        status: 500,
      });
    }
  };