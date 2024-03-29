/* Import packages */
import { Request, Response } from "express";
import { ACCEPTED, BAD_REQUEST } from "http-status";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
/* Import services */
import TwoFactorAuthService from "../../services/two-factor-auth/two-factor-auth.service";

export const upsertTwoFactor = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { user: { payload: { user_id } }, body } = req;
  const { setup_code, two_fa_code } = body;
  const twoFactorAuthService = new TwoFactorAuthService(context);
  const twoFactorAuth = await twoFactorAuthService.get({ user_id });
  if (twoFactorAuth) {
    const verified = twoFactorAuthService.verifyTwoFactorCode(twoFactorAuth.setup_code, two_fa_code);
    if (!verified) throw new ResponseError(BAD_REQUEST, ERROR_CODE.COMMON_SETTING_FAIL);
    await twoFactorAuthService.update({ ...body, user_id }, setup_code);
  } else {
    const verified = twoFactorAuthService.verifyTwoFactorCode(setup_code, two_fa_code);
    if (!verified) throw new ResponseError(BAD_REQUEST, ERROR_CODE.COMMON_SETTING_FAIL);
    await twoFactorAuthService.create({ ...body, user_id });
  }
  await commit();
  res.sendStatus(ACCEPTED);
});