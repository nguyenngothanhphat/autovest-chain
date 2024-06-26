/* Import packages */
import { Router } from "express";
/* Import controllers */
import authController from "./controllers/auth";
import userController from "./controllers/user";
import walletController from "./controllers/wallet";
import cryptoTokenController from "./controllers/token";
import countryController from "./controllers/country";

const registerRoutes = () => {
  const router = Router();

  router.use('/auth', authController());
  router.use('/users', userController());
  router.use('/wallets', walletController());
  router.use('/tokens', cryptoTokenController());
  router.use('/countries', countryController());

  return router;
}

export default registerRoutes;