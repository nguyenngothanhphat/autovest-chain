import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { sendActivationEmail } from "../../middlewares/send-activation-email";
import registerController from "../../utils/registerController";
import { registerSchema } from "./_schemas";
import { register } from "./register";
import { activate } from "./activate";

const authController = registerController((router: Router) => {
  router.get('/activate', activate);
  router.post('/register', validate(registerSchema), register, sendActivationEmail);
});

export default authController;