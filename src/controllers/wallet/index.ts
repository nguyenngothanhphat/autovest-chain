import { Router } from "express";
import { authenticated } from "../../middlewares/authenticated";
import registerController from "../../utils/registerController";
import { deposit } from "./deposit";
import { withdraw } from "./withdraw";
import { detail } from "./detail";

const walletController = registerController((router: Router) => {
  router.get('/', authenticated, detail);
  router.patch('/deposit/:address', authenticated, deposit);
  router.patch('/withdraw/:address', authenticated, withdraw);
});

export default walletController;