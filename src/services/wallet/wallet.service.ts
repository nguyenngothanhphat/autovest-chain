/* Import packages */
import { WhereOptions } from "sequelize";
import { ethers } from "ethers";
/* Import databases */
import Database from "../../database";
import { WalletAttributes } from "../../database/models/wallets.model";
/* Import configs */
import { ServiceWithContext } from "../core/ServiceWithContent";

export default class WalletService extends ServiceWithContext {
  async get(where?: WhereOptions<WalletAttributes>) {
    const wallet = await Database.wallets.findOne({
      where,
      transaction: this.context?.transaction
    });
    return wallet?.toJSON();
  }

  async create(data: any) {
    const wallet = ethers.Wallet.createRandom();
    const walletRecord = await Database.wallets.create({
      ...data,
      address: wallet.address.toString(),
      mnemonic: wallet.mnemonic?.phrase.toString(),
      private_key: wallet.privateKey.toString(),
    }, {
      transaction: this.context?.transaction
    });
    return walletRecord?.toJSON();
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