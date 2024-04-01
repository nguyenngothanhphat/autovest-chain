import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface WalletAttributes {
  wallet_id: string;
  address: string;
  private_key: string;
  mnemonic: string;
}

export class Wallet extends BaseModel<WalletAttributes> implements WalletAttributes {
  wallet_id!: string;
  address!: string;
  private_key!: string;
  mnemonic!: string;

  static associate(models: Sequelize['models']) {
    // define association here
  }
}

export default makeModel((sequelize) => {
  Wallet.init({
    wallet_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    private_key: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mnemonic: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'wallets',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  });
  return Wallet;
})