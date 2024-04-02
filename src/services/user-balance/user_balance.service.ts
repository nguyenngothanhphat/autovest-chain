/* Import packages */
import { WhereOptions } from "sequelize";
/* Import databases */
import Database from "../../database";
import { UserBalanceAttributes } from "../../database/models/user_balances.model";
/* Import configs */
import { ServiceWithContext } from "../core/ServiceWithContent";

export default class UserBalanceService extends ServiceWithContext {
  create(data: any) {
    return Database.user_balances.create({
      ...data
    }, {
      transaction: this.context?.transaction
    });
  }
}