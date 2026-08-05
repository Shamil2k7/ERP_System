import nodemailer from "nodemailer";

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "EMAIL_USER or EMAIL_PASS is missing in the .env file."
    );
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
};

const sendOTPEmail = async (email, otp) => {
  try {
    console.log("==================================");
    console.log("Sending OTP...");
    console.log("Email :", email);
    console.log("OTP   :", otp);
    console.log("==================================");

    const tx = getTransporter();

    const info = await tx.sendMail({
      from: `"ERP System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ERP Email Verification OTP",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>ERP System</h2>

          <p>Your OTP is:</p>

          <h1 style="color:green;letter-spacing:5px;">
            ${otp}
          </h1>

          <p>This OTP is valid for 5 minutes.</p>

          <p>If you didn't request this OTP, ignore this email.</p>
        </div>
      `,
    });

    console.log("✅ OTP Email Sent Successfully");
    console.log(info.messageId);
  } catch (error) {
    console.error("❌ Failed to send OTP");
    console.error(error);
    throw error;
  }
};

export { sendOTPEmail };