import {
  loginService,
  changePasswordService,
  forgotPasswordService,
  verifyResetOTPService,
  resetPasswordService,
  verifyEmailService,
} from "./auth.service.js";

// Login
const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const result = await loginService(login, password);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const result = await changePasswordService(
      email,
      currentPassword,
      newPassword
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPasswordService(email);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Reset OTP
const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyResetOTPService(email, otp);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await resetPasswordService(email, password);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Email (Handles YES / NO clicks from email)
const verifyEmail = async (req, res) => {
  const { token, action } = req.query;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  try {
    const result = await verifyEmailService(token, action);

    // If request comes from email click in browser, render clean HTML response
    if (req.accepts("html") || req.headers["user-agent"]) {
      const isYes = result.action === "yes";

      // YES: close the tab / go blank immediately — account is already verified
      if (isYes) {
        return res.status(200).send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Verified</title></head><body><script>try{window.close();}catch(e){}setTimeout(function(){window.location.replace('about:blank');},100);</script></body></html>`);
      }

      // NO: show a simple decline card
      return res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Declined</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
            .card { background: #ffffff; border-radius: 12px; padding: 36px 28px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 380px; width: 90%; border: 1px solid #e2e8f0; }
            .icon-badge { width: 60px; height: 60px; border-radius: 50%; background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 16px auto; font-weight: bold; }
            h1 { color: #0f172a; font-size: 18px; margin: 0 0 8px 0; font-weight: 600; }
            p { color: #64748b; font-size: 14px; margin: 0; line-height: 1.5; }
            .subtext { font-size: 12px; color: #94a3b8; margin-top: 14px; border-top: 1px solid #f1f5f9; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="icon-badge">✕</div>
            <h1>Verification Declined</h1>
            <p>${result.message}</p>
            <p class="subtext">You can close this tab.</p>
          </div>
        </body>
        </html>
      `);
    }

    return res.status(200).json(result);
  } catch (error) {
    if (req.accepts("html") || req.headers["user-agent"]) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Error</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
            .card { background: white; border-radius: 16px; padding: 40px 30px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-width: 440px; width: 90%; }
            .icon-badge { width: 70px; height: 70px; border-radius: 50%; background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 36px; margin: 0 auto 20px auto; }
            h1 { color: #dc2626; font-size: 22px; margin-bottom: 12px; font-weight: 700; }
            p { color: #475569; font-size: 15px; margin-bottom: 28px; line-height: 1.6; }
            .btn { display: inline-block; background-color: #64748b; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="icon-badge">!</div>
            <h1>Verification Request Invalid</h1>
            <p>${error.message}</p>
            <a href="${frontendUrl}/auth/login" class="btn">Return to Login</a>
          </div>
        </body>
        </html>
      `);
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  login,
  changePassword,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  verifyEmail,
};