import { connect } from "@/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
var bycryptjs = require("bcryptjs");

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      firstname,
      lastname,
      nationalid,
      whatsappnumber,
      address,
      email,
      password,
    } = reqBody;

    // check whether user exists
    await User.findOne({ email: email }).then((user) => {
      if (user) {
        return NextResponse.json(
          { message: "User already exists", success: false },
          { status: 400 }
        );
      }
    });

    // hash password
    const salt = await bycryptjs.genSalt(10);
    const hashedPassword = await bycryptjs.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      nationalid,
      whatsappnumber,
      address,
      email,
      password: hashedPassword,
    }).save();

    console.log(newUser);

    // send verification email
    // await sendEmail({email: newUser.email, emailType: "VERIFY", userId: newUser._id})

    return NextResponse.json(
      { message: "User created successfully", success: true, newUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* sample user json
{
    "firstname": "Max",
    "lastname": "Robinson",
    "nationalid": "12345678",
    "whatsappnumber": "0712345678",
    "address": "123, Nairobi",
    "email": "m@gmail.com",
    "password": "password"
}
*/
