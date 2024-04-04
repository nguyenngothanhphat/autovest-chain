/* Import packages */
import { Request, Response } from "express";
import { BAD_REQUEST } from "http-status";
/* Import configs */
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
import { withServiceContext } from "../../utils/withServiceContext";
/* Import services */
import CryptoTokenService from "../../services/crypto-token/crypto-token.service";

export const create = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { body } = req;
  const { symbol } = body;
  const cryptoTokenService = new CryptoTokenService(context);
  const token = await cryptoTokenService.get({ symbol });
  if (token) throw new ResponseError(BAD_REQUEST, ERROR_CODE.CRYPTO_TOKEN_SYMBOL_EXISTS);
  const created = await cryptoTokenService.create(body);
  await commit();
  res.json(created);
});