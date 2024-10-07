import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
import Job from "@/models/jobModel";
import Task from "@/models/jobModel";
import User from "@/models/userModel";

connect();

export const GET = async (request: Request, { params }: { params: any }) => {
  try {
    const name = params.id;
    const tasks = await User.find({ firstname: { $regex: new RegExp(`^${name}`,'i') } }).limit(10);
    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (error: any) {
    return new NextResponse("error with featching tasks " + error, {
      status: 500,
    });
  }
};
