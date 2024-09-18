var bycryptjs = require("bcryptjs");
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bycryptjs.hash(userId.toString(), 10);
    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotpasswordtocken: hashedToken,
        forgotpasswordexpire: Date.now() + 3600000,
      });
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c779ee8cf80af8",
          pass: "2ad6afba983d0f",
        },
      });

      const mailOptions = {
        from: "kasunmadhuranga2001@gmail.com",
        to: email,
        subject:
          emailType == "VERIFY"
            ? "Verify your AWE password"
            : "Reset your AWE password",
        html: `Please <a href="${
          process.env.DOMAIN
        }/verify?emailToken=${hashedToken}}">Click here to ${
          emailType == "VERIFY"
            ? "Verify your AWE password"
            : "Reset your AWE password"
        }</a>`,
      };

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
      
    } else if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verificationToken: hashedToken,
        verificationTokenExpires: Date.now() + 3600000,
      });
    }
  } catch (error: any) {
    throw new Error(error.messager);
  }
};

/*
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c779ee8cf80af8",
    pass: "2ad6afba983d0f"
  }
});
*/
