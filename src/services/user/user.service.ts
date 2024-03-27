/* Import packages */
import { WhereOptions } from "sequelize";
import { v4 as uuid } from "uuid";
/* Import databases */
import Database from "../../database";
import { ServiceWithContext } from "../core/ServiceWithContent";
import { UserAttributes } from "../../database/models/users.model";
/* Import constants */
import { CommonTokenAction } from "../../constants/Enums";
/* Import services */
import AuthService from "../auth/auth.service";
import TokenService from "../token/token.service";
/* Import configs */
import APP_CONFIG from "../../configs/app";

export default class UserService extends ServiceWithContext {
  get(where?: WhereOptions<UserAttributes>) {
    return Database.users.findOne({
      where,
      transaction: this.context?.transaction
    });
  }

  async create(data: any) {
    const { username, password, ...userInfo } = data;
    const hashedPassword = AuthService.hashPassword(password);
    const registedUser = await Database.users.create({
      ...userInfo,
      password: hashedPassword
    }, {
      transaction: this.context?.transaction
    }).then((res) => res.toJSON());
    const { user_id } = registedUser;
    await Database.identities.create({
      user_id, username, password
    }, {
      transaction: this.context?.transaction
    });
    const token_id = uuid();
    const createdToken = await Database.tokens.create({
      token_id,
      action: CommonTokenAction.ActivateAccount,
      token: TokenService.generateToken(
        { token_id, user_id, action: CommonTokenAction.ActivateAccount },
        APP_CONFIG.JWT.MAX_AGE_TOKEN_ACTION
      )
    }, {
      transaction: this.context?.transaction
    }).then((res) => res.toJSON());
    return {
      ...registedUser,
      token: createdToken.token
    };
  }

  async update(data: any, user_id: string) {
    return Database.users.update({
      ...data
    }, {
      where: { user_id },
      transaction: this.context?.transaction,
    })
  }
}