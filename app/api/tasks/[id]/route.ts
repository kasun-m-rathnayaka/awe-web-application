import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
import Job from "@/models/jobModel";
import Task from "@/models/jobModel";
import User from "@/models/userModel";

connect();

export const DELETE = async (request: Request, { params }: { params: any }) => {
  try {
    const id = params.id;
    const array = id.split("+");
    const {userId, projectId} = {userId: array[0], projectId: array[1]};

    const user = await User.findById(userId);
    // remove the project from the user's projects array
    user.projects = user.projects.filter((project: any) => project._id != projectId);
    
    // save the user
    await user.save();

    return new NextResponse("Task removed successfully", { status: 200 });

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