import { connect } from "@/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)

        const user = await User.findOne({verificationToken: token, verificationTokenExpires: { $gt: Date.now() }})
        if(!user){
            return NextResponse.json({message: "Invalid token", success: false}, {status: 400})
        }
        console.log(user)

        user.verificationToken = undefined
        user.verificationTokenExpires = undefined
        user.isVerified = true
        const savedUser = await user.save()

        

        return NextResponse.json({message: "Email verified successfully",savedUser:savedUser, success: true}, {status: 200})

    } catch (error:any) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}