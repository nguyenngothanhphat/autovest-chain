/* Import packages */
import { Router } from "express";
/* Import controllers */
import authController from "./controllers/auth";
import userController from "./controllers/user";

const registerRoutes = () => {
  const router = Router();

  router.use('/auth', authController());
  router.use('/users', userController());

  return router;
}

export default registerRoutes;