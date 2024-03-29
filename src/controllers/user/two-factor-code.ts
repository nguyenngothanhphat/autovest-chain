/* Import packages */
import { Request, Response } from "express";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
/* Import services */
import TwoFactorAuthService from "../../services/two-factor-auth/two-factor-auth.service";

export const twoFactorCode = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { user: { payload: { user_id, username } } } = req;

  const twoFactorAuthService = new TwoFactorAuthService();
  const twoFaExists: any =  twoFactorAuthService.get({ user_id });

  const { barcode_image_url, setup_code } = await twoFactorAuthService.generateTwoFactorCode(username);

  const exists = await twoFaExists;

  if (exists) {
    res.json({
      barcode_image_url,
      setup_code,
      is_enable: exists.is_enable
    });
  }
  
  res.json({
    barcode_image_url,
    setup_code,
    is_enable: false
  });
})