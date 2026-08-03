import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTPEmail = async (email, otp) => {

    const mailOptions = {
        from: `"ERP System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Email Verification OTP",
        html: `
            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
                <h2 style="color:#2563eb;">ERP System</h2>

                <p>Hello,</p>

                <p>Your Email Verification OTP is:</p>

                <h1 style="letter-spacing:5px; color:#16a34a;">
                    ${otp}
                </h1>

                <p>
                    This OTP is valid for
                    <strong>5 minutes</strong>.
                </p>

                <p>
                    If you didn't request this OTP,
                    please ignore this email.
                </p>

                <hr>

                <small>
                    ERP Management System
                </small>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

export {
    sendOTPEmail
};