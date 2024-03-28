import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { authenticated } from "../../middlewares/authenticated"
import registerController from "../../utils/registerController";
import { upsertTwoFactorSchema } from "./_schemas";
import { twoFactorCode } from "./two-factor-code";
import { upsertTwoFactor } from "./upsert-two-factor";

const userController = registerController((router: Router) => {
  router.get('/two-factor-code', authenticated, twoFactorCode);
  router.post('/two-factor-auth', authenticated, validate(upsertTwoFactorSchema), upsertTwoFactor);
});

export default userController;