/* Import packages */
import { WhereOptions, FindOptions } from "sequelize";
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
import { generateRandomCode } from "../../utils/number";

export default class UserService extends ServiceWithContext {
  async get(where?: WhereOptions<UserAttributes>, options?: FindOptions<UserAttributes>) {
    return Database.users.findOne({
      where,
      ...options,
      transaction: this.context?.transaction
    }).then((res) => res?.toJSON());
  }

  async create(data: any) {
    const { username, password, ...userInfo } = data;
    const authService = new AuthService();
    const hashedPassword = authService.hashPassword(password);
    const registedUser = await Database.users.create({
      ...userInfo,
      code: generateRandomCode()
    }, {
      transaction: this.context?.transaction
    }).then((res) => res.toJSON());
    const { user_id } = registedUser;
    await Database.identities.create({
      user_id, username, password: hashedPassword
    }, {
      transaction: this.context?.transaction
    });
    const token_id = uuid();
    const tokenService = new TokenService();
    const createdToken = await tokenService.create({
      token_id,
      action: CommonTokenAction.ActivateAccount,
      token: tokenService.generateToken(
        { token_id, user_id, action: CommonTokenAction.ActivateAccount },
        APP_CONFIG.JWT.MAX_AGE_TOKEN_ACTION
      )
    });
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