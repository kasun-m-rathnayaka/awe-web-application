import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Task from "@/models/jobModel";
var ObjectId = require("mongodb").ObjectId;

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
    } else {
      return NextResponse.json(
        { message: "User does not exists", success: false },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return new NextResponse("error with featching users " + error, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request, { params }: { params: any }) => {
  try {
    const userId = params.id;
    const task = await request.json();
    const featchTask = await Task.findOne({ name: task.id });
    const { _id, payment, paid } = featchTask;
    const newpaidammount = parseInt(paid) + parseInt(task.ammount);
    
    // this feature needs to be implemented 
    if (parseInt(payment) > newpaidammount) {
      return NextResponse.json(
        {
          message: "Payment is exceeding the required ammount",
          success: false,
        },
        { status: 400 }
      );
    }
    const updateTask = await Task.findByIdAndUpdate(
      { _id: _id },
      { paid: newpaidammount },
      { new: true }
    );
    if (updateTask) {
      return NextResponse.json("task updated successfully", { status: 200 });
    }
    return NextResponse.json(
      { message: "Task does not exists", success: false },
      { status: 400 }
    );
  } catch (error: any) {
    return new NextResponse("Error updating user: " + error, { status: 500 });
  }
};
