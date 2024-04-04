import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { authenticated } from "../../middlewares/authenticated";
import { sendActivationEmail } from "../../middlewares/send-activation-email";
import { sendResetPasswordEmail } from "../../middlewares/send-reset-password-email";
import registerController from "../../utils/registerController";
import { loginSchema, registerSchema, changePasswordSchema, initForgotPasswordSchema, forgotPasswordSchema, refreshTokenSchema } from "./_schemas";
import { login } from "./login";
import { register } from "./register";
import { activate } from "./activate";
import { changePassword } from "./change-password";
import { forgotPassword } from "./forgot-password";
import { initForgotPassword } from "./init-forgot-password";
import { refresh } from "./refresh";
import { logout } from "./logout";

const authController = registerController((router: Router) => {
  router.get('/activate', activate);
  router.post('/login', validate(loginSchema), login);
  router.post('/refresh', validate(refreshTokenSchema), refresh);
  router.post('/register', validate(registerSchema), register, sendActivationEmail);
  router.post('/logout', logout);
  router.post('/change-password', authenticated, validate(changePasswordSchema), changePassword);
  router.post('/init-forgot-password', validate(initForgotPasswordSchema), initForgotPassword, sendResetPasswordEmail);
  router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
});

export default authController;