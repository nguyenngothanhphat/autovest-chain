/* Import packages */
import { Request, Response } from "express";
import { ACCEPTED } from "http-status";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
/* Import services */
import CryptoTokenService from "../../services/crypto-token/crypto-token.service";

export const remove = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { params: { id: crypto_token_id } } = req;
  const cryptoTokenService = new CryptoTokenService(context);
  await cryptoTokenService.delete(crypto_token_id);
  await commit();
  res.sendStatus(ACCEPTED)
})