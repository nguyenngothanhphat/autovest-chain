/* Import packages */
import { WhereOptions, FindOptions, Model } from "sequelize";
import { v4 as uuid } from "uuid";
import { ethers } from "ethers";
/* Import databases */
import Database from "../../database";
import { UserAttributes } from "../../database/models/users.model";
import { Wallet } from "../../database/models/wallets.model";
/* Import constants */
import { CommonTokenAction } from "../../constants/Enums";
/* Import services */
import AuthService from "../auth/auth.service";
import TokenService from "../token/token.service";
import CryptoTokenService from "../crypto-token/crypto-token.service";
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

    const authServicePromise = Database.identities.create({
      user_id,
      username,
      password: hashedPassword
    }, { transaction: this.context?.transaction });
    
    const wallet = ethers.Wallet.createRandom();
    const walletServicePromise = Database.wallets.create({
      user_id,
      address: wallet.address.toString(),
      mnemonic: wallet.mnemonic?.phrase.toString(),
      private_key: wallet.privateKey.toString(),
    }, {
      transaction: this.context?.transaction
    });
    const userBalanceServicePromise = Database.user_balances.create({
      user_id
    }, { transaction: this.context?.transaction });
    const results = await Promise.all([walletServicePromise, userBalanceServicePromise, authServicePromise]);

    const createdWallet: Model<Wallet> = results[0] as Model<Wallet>;

    const cryptoTokenService = new CryptoTokenService();

    const defaultTokens = ['USDT', APP_CONFIG.TOKEN_SYMBOL_SYSTEM];
    const tokenCreationPromises = defaultTokens.map(async (symbol) => {
      const token = await cryptoTokenService.get({ symbol });
      if (token) {
        return Database.wallet_crypto_tokens.create({
          wallet_id: createdWallet.dataValues.wallet_id,
          crypto_token_id: token.crypto_token_id
        }, { 
          transaction: this.context?.transaction
        })
      }
    })

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