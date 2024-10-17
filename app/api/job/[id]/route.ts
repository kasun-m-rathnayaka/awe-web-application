import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Task from "@/models/jobModel";

connect();

export const PATCH = async (request: Request, { params }: { params: any }) => {
  try {
    const _id = params.id;
    const task = await request.json();
    const { writer, description, deadline, payment, status } = task;

    // check if the task data is complete
    if ( !deadline || !payment || !status) {
      return new NextResponse("Please provide all the nessary task details", {
        status: 400,
      });
    }

    // featch userdata and append the project to the user
    const user = await User.findOne({firstname:writer});
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    user.projects.push({_id:_id});
    const updatedWriter = await User.findOneAndUpdate({firstname:writer},{projects:user.projects});
    
    const featchTask = await Task.findByIdAndUpdate(_id, {
        writer,
        description,
        deadline,
        payment,
        status,
      });
    // check if the task was updated
    if (featchTask) {
      return new NextResponse(
        JSON.stringify({
          message: "Task updated successfully",
          task: featchTask,
        }),
        { status: 200 }
      );
    } else {
      return new NextResponse("Task not found", { status: 404 });
    }
  } catch (error: any) {
    return new NextResponse("Error updating task: " + error, { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: { params: any }) => {
  try {
    const _id = params.id;
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }   

    return new NextResponse("Task removed successfully", { status: 200 });

  } catch (error) {
    return new NextResponse("Error deleting user: " + error, { status: 500 });
  }
};