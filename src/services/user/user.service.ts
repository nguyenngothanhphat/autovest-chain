/* Import packages */
import { WhereOptions, FindOptions, Model } from "sequelize";
import { v4 as uuid } from "uuid";
/* Import databases */
import Database from "../../database";
import { UserAttributes } from "../../database/models/users.model";
import { Wallet } from "../../database/models/wallets.model";
/* Import constants */
import { CommonTokenAction } from "../../constants/Enums";
/* Import services */
import AuthService from "../auth/auth.service";
import TokenService from "../token/token.service";
import WalletService from "../wallet/wallet.service";
import UserBalanceService from "../user-balance/user_balance.service";
import CryptoTokenService from "../crypto-token/crypto-token.service";
import WalletCryptoTokenService from "../wallet-crypto-token/wallet-crypto-token.service";
/* Import configs */
import APP_CONFIG from "../../configs/app";
import { ServiceWithContext } from "../core/ServiceWithContent";
import { generateRandomCode } from "../../utils/number";

export default class UserService extends ServiceWithContext {
  async get(where?: WhereOptions<UserAttributes>, options?: FindOptions<UserAttributes>) {
    const user = await Database.users.findOne({
      where,
      ...options,
      transaction: this.context?.transaction
    });
    return user?.toJSON();
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
    });

    const userJson = registedUser.toJSON();
    const { user_id } = userJson;

    const walletService = new WalletService();
    const authServicePromise = authService.create({ 
      user_id,
      username,
      password: hashedPassword
    });
    const walletServicePromise = walletService.create({ user_id });
    const userBalanceService = new UserBalanceService();
    const userBalanceServicePromise = userBalanceService.create({ user_id });
    const results = await Promise.all([walletServicePromise, userBalanceServicePromise, authServicePromise]);

    const createdWallet: Model<Wallet> = results[0] as Model<Wallet>;

    const cryptoTokenService = new CryptoTokenService();
    const tokenCreationPromises = [];

    const defaultTokens = ['USDT', APP_CONFIG.TOKEN_SYMBOL_SYSTEM];
    const walletCryptoTokenService = new WalletCryptoTokenService();
    for (const symbol of defaultTokens) {
    const tokenCreationPromise = cryptoTokenService.get({ symbol }).then(token => {
      if (token) {
        return walletCryptoTokenService.create({ wallet_id: createdWallet.dataValues.wallet_id, crypto_token_id: token.crypto_token_id });
      }
    });
    tokenCreationPromises.push(tokenCreationPromise);
  }

  await Promise.all(tokenCreationPromises);

    const tokenService = new TokenService();
    const token_id = uuid();
    const token = tokenService.generateToken({ 
      token_id, 
      user_id, 
      action: CommonTokenAction.ActivateAccount 
    }, APP_CONFIG.JWT.MAX_AGE_TOKEN_ACTION);

    const createdToken = await tokenService.create({
      token_id,
      action: CommonTokenAction.ActivateAccount,
      token
    });

    return {
      ...userJson,
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