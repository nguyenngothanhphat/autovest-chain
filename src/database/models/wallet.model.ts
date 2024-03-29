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