import { connect } from "@/dbConfig";
import Task from "@/models/jobModel";
import { NextResponse } from "next/server";

connect();

export const GET = async () => {
    try {
      const tasks = await Task.find().sort({ status: -1, deadline: 1});
      return new NextResponse(JSON.stringify(tasks), { status: 200 });
    } catch (error: any) {
      return new NextResponse("error with featching tasks " + error, {
        status: 500,
      });
    }
  };