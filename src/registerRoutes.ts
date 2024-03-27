/* Import packages */
import { Router } from "express";
/* Import controllers */
import authController from "./controllers/auth";

const registerRoutes = () => {
  const router = Router();

  router.use('/auth', authController);

  return router;
}

export default registerRoutes;