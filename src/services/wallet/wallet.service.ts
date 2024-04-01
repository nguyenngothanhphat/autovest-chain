/* Import packages */
import { WhereOptions } from "sequelize";
import { ethers } from "ethers";
/* Import databases */
import Database from "../../database";
import { WalletAttributes } from "../../database/models/wallet.model";
/* Import configs */
import { ServiceWithContext } from "../core/ServiceWithContent";

export default class WalletService extends ServiceWithContext {
  async get(where?: WhereOptions<WalletAttributes>) {
    return Database.wallets.findOne({
      where,
      transaction: this.context?.transaction
    }).then((res) => res?.toJSON());
  }

  create(user_id: string) {
    const wallet = ethers.Wallet.createRandom();
    return Database.wallets.create({
      address: wallet.address.toString(),
      mnemonic: wallet.mnemonic?.phrase.toString(),
      private_key: wallet.privateKey.toString(),
      user_id: user_id
    }, {
      transaction: this.context?.transaction
    })
  }

  update(data: any, address: string) {
    return Database.wallets.update({
      ...data
    }, {
      where: { address },
      transaction: this.context?.transaction
    });
  }
}