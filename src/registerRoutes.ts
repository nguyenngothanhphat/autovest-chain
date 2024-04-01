/* Import packages */
import { Router } from "express";
/* Import controllers */
import authController from "./controllers/auth";
import userController from "./controllers/user";
import walletController from "./controllers/wallet";

const registerRoutes = () => {
  const router = Router();

  router.use('/auth', authController());
  router.use('/users', userController());
  router.use('/wallets', walletController());

  return router;
}

export default registerRoutes;