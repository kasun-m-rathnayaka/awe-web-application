import { connect } from "@/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Task from "@/models/jobModel";
import User from "@/models/userModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user.projects) {
      return NextResponse.json(
        { message: "No projects found" },
        { status: 404 }
      );
    }
    const count = user.projects.length;

    const tasks = await Promise.all(
        user.projects.map(async (project: any) => {
          const task = await Task.findById(project._id);
          return task;
        })
      );
    
      let lateTasks = 0;
      let competedTasks = 0;
      let remainingTasks = 0;
    
      tasks.forEach(task => {
        if (task.deadline < Date.now()) {
          lateTasks++;
          console.log(lateTasks);
        }
        if (task.status === "completed") {
          competedTasks++;
        } else {
          remainingTasks++;
        }
      });

    return NextResponse.json(
      {
        data: user,
        count: count,
        latetasks: lateTasks,
        remainingtasks: remainingTasks,
        competedtasks: competedTasks,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
