import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
import Job from "@/models/jobModel";
import Task from "@/models/jobModel";

connect();

export const DELETE = async (request: Request, { params }: { params: any }) => {
  try {
    const _id = params.id;
    const deletedUser = await Job.findByIdAndDelete(_id);

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
    const tasks = await Task.findById({_id});
    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (error: any) {
    return new NextResponse("error with featching tasks " + error, {
      status: 500,
    });
  }
};