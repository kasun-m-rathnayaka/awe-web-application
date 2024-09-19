import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
import Job from "@/models/jobModel";

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
