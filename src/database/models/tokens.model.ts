import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from "../BaseModel";

export interface TokenAttributes {
  token_id: string;
  action: string;
  token: string;
  is_valid: boolean;
}

export class Token extends BaseModel<TokenAttributes> implements TokenAttributes {
  token_id!: string;
  action!: string;
  token!: string;
  is_valid!: boolean;

  static associate(models: Sequelize["models"]) {
    // define association here
  }
}

export default makeModel((sequelize) => {
  Token.init({
    token_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: "tokens",
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
  return Token;
})