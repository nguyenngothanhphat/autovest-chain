import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { sendActivationEmail } from "../../middlewares/send-activation-email";
import registerController from "../../utils/registerController";
import { loginSchema, registerSchema } from "./_schemas";
import { login } from "./login";
import { register } from "./register";
import { activate } from "./activate";

const authController = registerController((router: Router) => {
  router.get('/activate', activate);
  router.post('/login', validate(loginSchema), login);
  router.post('/register', validate(registerSchema), register, sendActivationEmail);
});

export default authController;