/* Import packages */
import { Order, WhereOptions } from "sequelize";
import { NOT_FOUND } from "http-status";
/* Import databases */
import Database from "../../database";
import { CryptoTokenAttributes } from "../../database/models/crypto_tokens.model";
/* Import configs */
import { ServiceWithContext } from "../core/ServiceWithContent";
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";

interface SortParams {
  field: string
  order: 'ASC' | 'DESC'
}

export default class CryptoTokenService extends ServiceWithContext {
  async list(limit: number, offset: number, where?: WhereOptions<CryptoTokenAttributes>, sort?: SortParams) {
    const order = sort?.field ? [[sort.field, sort.order]] : [];
    return Database.crypto_tokens.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [...order] as Order,
      where,
      transaction: this.context?.transaction
    })
  }

  async get(where?: WhereOptions<CryptoTokenAttributes>) {
    const cryptoToken = await Database.crypto_tokens.findOne({
      where,
      transaction: this.context?.transaction
    });
    return cryptoToken?.toJSON();
  }
  
  create(data: any) {
    return Database.crypto_tokens.create({
      ...data
    }, {
      transaction: this.context?.transaction
    });
  }

  update(data: any, crypto_token_id: string) {
    return Database.crypto_tokens.update({
      ...data
    }, {
      where: { crypto_token_id },
      transaction: this.context?.transaction
    });
  }

  async delete(crypto_token_id: string) {
    const token = await Database.crypto_tokens.findByPk(crypto_token_id, {
      transaction: this.context?.transaction
    });

    if (!token) throw new ResponseError(NOT_FOUND, ERROR_CODE.CRYPTO_TOKEN_NOT_EXISTS);

    await token.destroy({
      transaction: this.context?.transaction
    });
  }
}