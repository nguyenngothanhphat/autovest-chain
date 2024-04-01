import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface TransactionAttributes {
  transaction_id: string;
  user_id: string;
  amount: number;
  type: string;
  fee?: number;
  address?: number;
  tx_id?: string;
  status: string;
}

export class Transaction extends BaseModel<TransactionAttributes> implements TransactionAttributes {
  transaction_id: string;
  user_id: string;
  amount: number;
  type: string;
  fee?: number;
  address?: number;
  tx_id?: string;
  status: string;

  static associate(models: Sequelize['models']) {
    // define association here
  }
}