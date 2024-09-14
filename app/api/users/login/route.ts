import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
var bycryptjs = require("bcryptjs");
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check whether user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exists", success: false },
        { status: 400 }
      );
    }

    // check password
    const validity = await bycryptjs.compare(password, user.password);
    if (!validity) {
      return NextResponse.json(
        { message: "Login unsuccessful, Password is incorrect", success: false },
        { status: 400 }
      );
    }
    // create and assign tocken
    // create token data
    const tokenData = {
      id: user._id,
      username: user.firstname,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({ token: token, success: true });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* sample user json
{
    "email": "k@gmail.com",
    "password": "123"
}
*/
