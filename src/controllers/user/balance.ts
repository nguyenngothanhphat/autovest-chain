/* Import packages */
import { Request, Response } from "express";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
/* Import services */
import WalletService from "../../services/wallet/wallet.service";

export const balance = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { user: { payload: { user_id } } } = req;
  const walletService = new WalletService(context);
  const wallet = await walletService.get({ user_id });
  await commit();
  res.json({
    money_point: wallet.money_point,
    money_token: wallet.money_token,
    money_usd: wallet.money_usd
  });
});