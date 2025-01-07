/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //  // TODO configure mail for usage

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000), // expiry 1 hour from now
        },
      });
      console.log("Updated user for verify: ", updatedUser);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // expiry 1 hour from now
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2c99d1acf54637", // ❌
        pass: "7332520e9183aa", // ❌
      },
    });

    const mailOptions = {
      from: "sonikm443@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your passowrd",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your passowrd"
      } or copy and paste the link below in your browser <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}  </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
