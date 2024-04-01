import { Router } from "express";
import { authenticated } from "../../middlewares/authenticated";
import registerController from "../../utils/registerController";
import { deposit } from "./deposit";
import { withdraw } from "./withdraw";

const walletController = registerController((router: Router) => {
  router.patch('/deposit/:address', authenticated, deposit);
  router.patch('/withdraw/:address', authenticated, withdraw);
});

export default walletController;