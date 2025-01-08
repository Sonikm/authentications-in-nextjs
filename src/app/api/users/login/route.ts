/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exits" },
        { status: 400 }
      );
    }
    // Check password
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    const tokenData =  {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // console.log("Is verified", user.isVerified);
    //* Uncomment this line if you want to verify user on login if user is not verified
    // if(!user.isVerified){
    //   // send verification email
    //   await sendEmail({email: user.email, emailType: "VERIFY", userId: user._id});
    //   return NextResponse.json({error: "Your email is not verified. Please check your inbox for the verification link." }, {status: 400});
    // }
    
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
    const response = NextResponse.json({message: "Logged In Success", success: true,})
    
    response.cookies.set("token", token, {
      httpOnly: true, // prevent from client side access, like javacsript
    })

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
