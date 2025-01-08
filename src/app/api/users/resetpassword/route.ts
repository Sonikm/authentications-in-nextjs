/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User with this email does not exist." },
        { status: 400 }
      );
    }
    // Send reset password email
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Password reset link has been sent to your email.",
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
