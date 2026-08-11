
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


// Send employee login details
const sendEmployeeCredentialsEmail = async (
  email,
  employeeId,
  password
) => {
  try {
    const tx = getTransporter();

    await tx.sendMail({
      from: `"ERP System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your ERP Employee Account",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 25px;
          border: 1px solid #ddd;
          border-radius: 10px;
        ">

          <h2 style="color: #2563eb;">
            Welcome to ERP System
          </h2>

          <p>
            Your employee account has been created by the administrator.
          </p>

          <p>
            You can use the following details to login:
          </p>

          <div style="
            background: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          ">

            <p>
              <strong>Employee ID:</strong>
              ${employeeId}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Temporary Password:</strong>
              ${password}
            </p>

          </div>

          <p>
            You can login using either your
            <strong>Email</strong> or
            <strong>Employee ID</strong>.
          </p>

          <p style="color: #dc2626;">
            Please change your password after logging in.
          </p>

          <p>
            If you did not expect this account, please contact your
            administrator.
          </p>

          <p style="margin-top: 30px;">
            Regards,<br>
            <strong>ERP System</strong>
          </p>

        </div>
      `,
    });

    console.log("Employee credentials email sent");
  } catch (error) {
    console.error("Failed to send employee credentials email");
    console.error(error);

    throw error;
  }
};


// Email Verification Link
const sendVerificationEmail = async (email, token) => {
  try {
    const tx = getTransporter();

    const verifyLink =
      `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const info = await tx.sendMail({
      from: `"ERP System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your ERP Account",

      html: `
        <div style="font-family: Arial; padding:20px;">

          <h2>Welcome to ERP System</h2>

          <p>
            Your employee account has been created by the administrator.
          </p>

          <p>
            Please click the button below to verify your email address.
          </p>

          <a
            href="${verifyLink}"
            style="
              background:#2563eb;
              color:white;
              padding:12px 20px;
              text-decoration:none;
              border-radius:5px;
              display:inline-block;
            "
          >
            Verify Email
          </a>

          <p style="margin-top:20px;">
            This verification link will expire in 30 minutes.
          </p>

          <p>
            If you didn't expect this email, you can safely ignore it.
          </p>

        </div>
      `,
    });

    console.log("Verification Email Sent");
    console.log(info.messageId);
  } catch (error) {
    console.error("Failed to send verification email");
    console.error(error);

    throw error;
  }
};


// Forgot Password OTP
const sendOTPEmail = async (email, otp) => {
  try {
    const tx = getTransporter();

    await tx.sendMail({
      from: `"ERP System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Password OTP",

      html: `
        <h2>Password Reset</h2>

        <p>Your OTP is</p>

        <h1>${otp}</h1>

        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    console.log("OTP Email Sent");
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export {
  sendEmployeeCredentialsEmail,
  sendVerificationEmail,
  sendOTPEmail,
};

