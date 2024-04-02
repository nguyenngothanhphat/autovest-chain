/* Import packages */
import { Request, Response } from "express";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
/* Import services */
import UserService from "../../services/user/user.service";
import Database from "../../database";

export const balance = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { user: { payload: { user_id } } } = req;
  const userService = new UserService(context);
  const user = await userService.get({ user_id }, {
    include: [
      { model: Database.user_balances, as: 'user_balance' }
    ]
  })
  await commit();
  res.json({
    money_point: user.user_balance.money_point,
    money_token: user.user_balance.money_token,
    money_usd: user.user_balance.money_usd
  });
});