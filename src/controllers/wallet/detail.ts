/* Import package */
import { Request, Response } from "express";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
/* Import services */
import WalletService from "../../services/wallet/wallet.service";

export const detail = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { user: { payload: { user_id } } } = req;
  
});