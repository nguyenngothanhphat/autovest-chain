/* Import packages */
import { WhereOptions } from "sequelize";
import crypto from "crypto";
import * as jwt from 'jsonwebtoken';
/* Import databases */
import Database from "../../database";
import { IdentityAttributes } from "../../database/models/identities.model";
import { UserAttributes } from "../../database/models/users.model";
/* Import configs */
import { ServiceWithContext } from "../core/ServiceWithContent";
import APP_CONFIG from "../../configs/app";

export default class AuthService extends ServiceWithContext {
  static verifyToken(token: string) {
    return jwt.verify(token, APP_CONFIG.JWT.SECRET as string, {
      algorithms: [APP_CONFIG.JWT.JWT_ALGORITHM as jwt.Algorithm]
    }) as {
      payload: UserAttributes & {
        username: string
      }
    }
  }

  hashPassword(password: string) {
    return crypto
      .createHmac(APP_CONFIG.HASH_ALGORITHM as string, APP_CONFIG.JWT.SECRET as string)
      .update(password)
      .digest("base64");
  }

  generateToken(data: any, maxAge: number) {
    return jwt.sign({
        payload: data
      },
      APP_CONFIG.JWT.SECRET as string,
      { 
        expiresIn: maxAge,
        algorithm: APP_CONFIG.JWT.JWT_ALGORITHM as jwt.Algorithm
      }
    );
  }

  async get(where?: WhereOptions<IdentityAttributes>) {
    return Database.identities.findOne({
      where,
      paranoid: false,
      transaction: this.context?.transaction
    }).then((res) => res?.toJSON());
  }

  update(data: any, identitiy_id: string) {
    return Database.identities.update({
      ...data
    }, {
      where: { identitiy_id },
      transaction: this.context?.transaction
    })
  }
}