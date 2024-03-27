/* Import packages */
import { WhereOptions } from "sequelize";
import crypto from "crypto";
/* Import databases */
import Database from "../../database";
import { IdentityAttributes } from "../../database/models/identities.model";
import { ServiceWithContext } from "../core/ServiceWithContent";
import APP_CONFIG from "../../configs/app";

export default class AuthService extends ServiceWithContext {
  static hashPassword(password: string) {
    return crypto
      .createHmac(APP_CONFIG.HASH_ALGORITHM as string, APP_CONFIG.JWT.SECRET as string)
      .update(password)
      .digest("base64");
  }

  get(where?: WhereOptions<IdentityAttributes>) {
    return Database.identities.findOne({
      where,
      paranoid: false,
      transaction: this.context?.transaction
    });
  }
}