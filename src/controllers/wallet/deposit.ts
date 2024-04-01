/* Import packages */
import { Request, Response } from "express";
import { NOT_FOUND, ACCEPTED } from "http-status";
/* Import configs */
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
import { withServiceContext } from "../../utils/withServiceContext";
/* Import services */
import WalletService from "../../services/wallet/wallet.service";

export const deposit = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { params: { address }, body } = req;
  const { currency, amount } = body;
  const walletService = new WalletService(context);
  const wallet = await walletService.get({ address });
  if (!wallet) throw new ResponseError(NOT_FOUND, ERROR_CODE.WALLET_NOT_EXISTS);
  if (currency === 'USDT') {
    wallet.money_usd += amount;
  } else if (currency === 'AIC') {
    wallet.money_token += amount;
  }
  await walletService.update(wallet, address);
  await commit();
  res.sendStatus(ACCEPTED);
});