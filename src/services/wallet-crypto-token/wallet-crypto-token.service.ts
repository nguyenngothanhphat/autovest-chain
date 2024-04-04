import { create } from '../../controllers/token/create';
/* Import databases */
import Database from "../../database";
/* Import configs */
import { ServiceWithContext } from "../core/ServiceWithContent";

export default class WalletCryptoTokenService extends ServiceWithContext {
  create(data: any) {
    return Database.wallet_crypto_tokens.create({
      ...data
    }, {
      transaction: this.context?.transaction
    });
  }
}