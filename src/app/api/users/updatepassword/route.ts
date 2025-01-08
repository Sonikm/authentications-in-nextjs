/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: new Date() }, // Ensure token is not expired
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired" },
        { status: 400 }
      );
    }

    console.log("New Password: ", newPassword);

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update the password and clear the reset token fields
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    const savedUser = await user.save();

    console.log("Password reset and saved user is: ", savedUser);

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
