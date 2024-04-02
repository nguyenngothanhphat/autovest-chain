import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface CryptoTokenAttributes {
  crypto_token_id: string;
  symbol: string;
  name?: string;
  description?: string;
  memo?: string;
}

export class CryptoToken extends BaseModel<CryptoTokenAttributes> implements CryptoTokenAttributes {
  crypto_token_id!: string;
  symbol!: string;
  name?: string;
  description?: string;
  memo?: string;

  static associate(models: Sequelize['models']) {
    // define association here
    CryptoToken.hasMany(models.wallet_crypto_tokens, {
      foreignKey: "crypto_token_id",
      sourceKey: "crypto_token_id"
    });
  }
}

export default makeModel((sequelize) => {
  CryptoToken.init({
    crypto_token_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    symbol: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT(),
      allowNull: true
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'crypto_tokens',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  })
  return CryptoToken;
})