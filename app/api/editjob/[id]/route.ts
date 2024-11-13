import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Task from "@/models/jobModel";

connect();

export const PATCH = async (request: Request, { params }: { params: any }) => {
  try {
    const _id = params.id;
    const task = await request.json();
    const { name, description, deadline, payment, status,employer } = task;
    console.log(task)
    // check if the task data is complete
    if ( !name || !deadline || !payment || !status || !employer) {
      return new NextResponse("Please provide all the nessary task details", {
        status: 400,
      });
    }

    // featch userdata and append the project to the user
    // const user = await User.findOne({firstname:writer});
    // if (!user) {
    //   return new NextResponse("User not found", { status: 404 });
    // }
    // user.projects.push({_id:_id});
    // const updatedWriter = await User.findOneAndUpdate({firstname:writer},{projects:user.projects});
    
    const featchTask = await Task.findByIdAndUpdate(_id, {
        name,
        description,
        deadline,
        payment,
        status,
        employer,
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
