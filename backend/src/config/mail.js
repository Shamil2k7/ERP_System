import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
dotenv.config({ path: resolve(__dirname, "../../.env") });

let transporter;

const getTransporter = () => {
  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s+/g, "");

  if (!emailUser || !emailPass) {
    throw new Error(
      "EMAIL_USER or EMAIL_PASS is missing in the .env file."
    );
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });
  }

  return transporter;
};

// Welcome Email — sent when admin creates an employee (no links)
const sendWelcomeEmail = async (email, fullName, employeeId, password) => {
  try {
    const tx = getTransporter();

    const info = await tx.sendMail({
      from: `"ERP System" <${process.env.EMAIL_USER?.trim()}>`,
      replyTo: process.env.EMAIL_USER?.trim(),
      to: email,
      subject: "Welcome to ERP System — Your Account is Ready",
      text: `Hello ${fullName},

Your employee account has been created successfully by the administrator.

Here are your login credentials:

  Employee ID : ${employeeId}
  Email       : ${email}
  Password    : ${password}

Please log in and change your password as soon as possible.

Thank you,
ERP System`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 28px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 700;">Welcome to ERP System</h2>
            <p style="color: #64748b; font-size: 13px; margin-top: 6px;">Your account has been created</p>
          </div>

          <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 8px;">Hello <strong>${fullName}</strong>,</p>
          <p style="color: #334155; font-size: 15px; line-height: 1.6;">Your employee account is ready. Use the credentials below to log in.</p>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px 24px; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #64748b; font-size: 13px; padding: 6px 0; width: 120px;">Employee ID</td>
                <td style="color: #0f172a; font-size: 14px; font-weight: 600; padding: 6px 0;">${employeeId}</td>
              </tr>
              <tr>
                <td style="color: #64748b; font-size: 13px; padding: 6px 0;">Email</td>
                <td style="color: #0f172a; font-size: 14px; font-weight: 600; padding: 6px 0;">${email}</td>
              </tr>
              <tr>
                <td style="color: #64748b; font-size: 13px; padding: 6px 0;">Password</td>
                <td style="color: #0f172a; font-size: 14px; font-weight: 600; padding: 6px 0;">${password}</td>
              </tr>
            </table>
          </div>

          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px; border-top: 1px solid #f1f5f9; padding-top: 14px;">
            Please change your password after first login. Keep your credentials safe.
          </p>
        </div>
      `,
    });

    console.log("✅ Welcome Email Sent:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error);
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

    console.log("✅ OTP Email Sent");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  sendWelcomeEmail,
  sendOTPEmail,
};