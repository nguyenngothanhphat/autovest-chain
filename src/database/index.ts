/* Import packages */
import { Sequelize, Options } from "sequelize";
import fs from "fs/promises";
import path from "path";
import DB_CONFIG from "../configs/database";
import { MODEL_SYMBOL } from "./makeModel";

export default class Database {
  static sequelize: Sequelize;

  static initModels = async () => {
    console.info('init models');
    const files = await fs.readdir(path.resolve(__dirname, './models'))
    const definitions: Promise<void>[] = []
    files.forEach(fileName => {
      const ext = fileName.split('.').slice(1).join('.')
      if (ext !== 'model.ts' && ext !== 'model.js') return;
      definitions.push(new Promise((rs, rj) => {
        import(path.resolve(__dirname, './models', fileName))
        .then(exported => {
          Object.values(exported).forEach(member => {
            if (typeof member !== 'function' || !member.prototype[MODEL_SYMBOL]) return;
            member(this.sequelize)
          })
          rs()
        })
        .catch(rj)
      }))
    })
    await Promise.all(definitions)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.values(this.sequelize.models).forEach((model: any) => {
        model.associate(this.sequelize.models)
    });
  }

  static connect = async () => {
    try {
      this.sequelize = new Sequelize({ ...DB_CONFIG, host: DB_CONFIG.proxy, benchmark: true } as Options);
      await this.sequelize.authenticate()
      await Database.initModels()
      console.info(
        "[✨ Database] Connection has been established successfully.",
        DB_CONFIG.host
      );
    } catch (error) {
      console.error("ERROR:", "[❌ Database] Unable to connect to the database:", error);
      throw error
    }
  }

  static get countries() {
    return this.sequelize.models.countries;
  };

  static get identities() {
    return this.sequelize.models.identities;
  }

  static get users() {
    return this.sequelize.models.users;
  }

  static get user_sessions() {
    return this.sequelize.models.user_sessions;
  }

  static get two_factor_auth() {
    return this.sequelize.models.two_factor_auth;
  }

  static get tokens() {
    return this.sequelize.models.tokens;
  }

  static get wallets() {
    return this.sequelize.models.wallets;
  }

  static get crypto_tokens() {
    return this.sequelize.models.crypto_tokens;
  }

  static get user_balances() {
    return this.sequelize.models.user_balances;
  }

  static get wallet_crypto_tokens() {
    return this.sequelize.models.wallet_crypto_tokens;
  }
}