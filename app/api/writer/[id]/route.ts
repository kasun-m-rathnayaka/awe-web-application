import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
var ObjectId = require('mongodb').ObjectId;

connect();

export const DELETE = async (request: Request, { params }: { params: any }) => {
  try {
    const _id = params.id;
    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({
        message: "User deleted successfully",
        user: deletedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error deleting user: " + error, { status: 500 });
  }
};

export const GET = async (request: Request, { params }: { params: any }) => {
  try {
    const _id = params.id;
    const user = await User.findOne({ _id: _id });
    if (user) {
      return NextResponse.json(
        { message: "User does exists", user: user },
        { status: 200 }
      );
    }
    else{
      return NextResponse.json({ message: "User does not exists", success: false }, { status: 400 }); 
    }
  } catch (error: any) {
    return new NextResponse("error with featching users " + error, {
      status: 500,
    });
  }
};