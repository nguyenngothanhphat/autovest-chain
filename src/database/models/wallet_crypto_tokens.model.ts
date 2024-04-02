import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface WalletCryptoTokenAttributes {
  wallet_id: string;
  crypto_token_id: string;
}

export class WalletCryptoToken extends BaseModel<WalletCryptoTokenAttributes> implements WalletCryptoTokenAttributes {
  wallet_id!: string;
  crypto_token_id!: string;

  static associate(models: Sequelize['models']) {
    // define association here
    WalletCryptoToken.belongsTo(models.wallets, {
      foreignKey: 'wallet_id'
    })
    WalletCryptoToken.belongsTo(models.crypto_tokens, {
      foreignKey: 'crypto_token_id',
    })
  }
}

export default makeModel((sequelize) => {
  WalletCryptoToken.init({
    crypto_token_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
    },
    wallet_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'wallet_crypto_tokens',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  })
  return WalletCryptoToken;
})