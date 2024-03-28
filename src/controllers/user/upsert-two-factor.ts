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
  const { secret, two_fa_code } = body;
  const twoFactorAuthService = new TwoFactorAuthService(context);
  const twoFactorAuth = await twoFactorAuthService.get({ user_id });
  if (twoFactorAuth) {
    const verified = twoFactorAuthService.verifyTwoFactorCode(JSON.parse(twoFactorAuth.secret), two_fa_code);
    console.log('twoFactorAuth.setup_code: ', twoFactorAuth.setup_code);
    console.log('verified1: ', verified);
    if (!verified) throw new ResponseError(BAD_REQUEST, ERROR_CODE.COMMON_SETTING_FAIL);
  } else {
    const verified = twoFactorAuthService.verifyTwoFactorCode(JSON.parse(secret), two_fa_code);
    console.log('verified2: ', verified);
    if (!verified) throw new ResponseError(BAD_REQUEST, ERROR_CODE.COMMON_SETTING_FAIL);
  }
  await twoFactorAuthService.upsert({ ...body, user_id });
  await commit();
  res.sendStatus(ACCEPTED);
});