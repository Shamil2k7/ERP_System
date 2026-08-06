import {
  addEmployeeSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  verifyResetOTPSchema,
  resetPasswordSchema,
} from "./auth.schema.js";
const validateAddEmployee = (req, res, next) => {

  const { error } = addEmployeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
const validateLogin = (req, res, next) => {

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
const validateChangePassword = (req, res, next) => {

  const { error } = changePasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
const validateForgotPassword = (req, res, next) => {

  const { error } = forgotPasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
const validateResetOTP = (req, res, next) => {

  const { error } = verifyResetOTPSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
const validateResetPassword = (req, res, next) => {

  const { error } = resetPasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};


export {
  validateAddEmployee,
  validateLogin,
  validateChangePassword,
  validateForgotPassword,
  validateResetOTP,
  validateResetPassword,
};