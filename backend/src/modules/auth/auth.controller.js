const { sendOTPService, verifyOTPService, signupService } = require("./auth.service.js");


//Send OTP
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await sendOTPService(email);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
// Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const result = await verifyOTPService(email, otp);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//Signup
const signup = async (req, res) => {
    try {
        const user = await signupService(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    sendOTP,
    verifyOTP,
    signup
};