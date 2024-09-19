// }export const DELETE = async (request: Request, { params }: { params: any }) => {
//     try {
//       const _id = params.id;
//       await connect().catch(console.dir);

//       const deletedUser = await ActiveModules.findByIdAndDelete(_id);

//       if (!deletedUser) {
//         return new NextResponse("User not found", { status: 404 });
//       }

//       return new NextResponse(
//         JSON.stringify({
//           message: "User deleted successfully",
//           user: deletedUser,
//         }),
//         { status: 200 }
//       );
//     } catch (error) {
//       return new NextResponse("Error deleting user: " + error, { status: 500 });
//     }
//   };

import { connect } from "@/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/jobModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      name,
      writer,
      description,
      deadline,
      payment,
      paid,
      status,
      employer,
    } = reqBody;

    // check whether all data available
    if (!name || !description || !deadline || !payment || !status) {
      return NextResponse.json(
        { message: "Please fill all required fields", success: false },
        { status: 400 }
      );
    }

    // check whether user exists
    await Task.findOne({ email: name }).then((job) => {
      if (job) {
        return NextResponse.json(
          { message: "Job already exists", success: false },
          { status: 400 }
        );
      }
    });

    const newTask = new Task({
      name,
      writer,
      description,
      deadline,
      payment,
      paid,
      status,
      employer,
    }).save();

    console.log(newTask);

    return NextResponse.json(
      { message: "Task created successfully", success: true, newTask },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const GET = async () => {
  try {
    const tasks = await Task.find();
    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (error: any) {
    return new NextResponse("error with featching tasks " + error, {
      status: 500,
    });
  }
};
