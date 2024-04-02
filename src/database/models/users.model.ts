import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';
import { Role } from "../../constants/Role";

export interface UserAttributes {
  user_id: string;
  code: string;
  fullname: string;
  email: string;
  phone_number: string;
  country_code: string;
  role: Role;
  invest: number;
  is_active: boolean;
}

export class User extends BaseModel<UserAttributes> implements UserAttributes {
  user_id!: string;
  code!: string;
  fullname!: string;
  email!: string;
  phone_number!: string;
  country_code: string;
  role!: Role;
  invest: number;
  is_active: boolean;

  static associate(models: Sequelize['models']) {
    // define association here
    User.hasOne(models.identities, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    User.hasOne(models.user_balances, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "user_balance"
    });
    User.hasOne(models.wallets, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      as: "wallet"
    })
  }
}

export default makeModel((sequelize) => {
  User.init({
    user_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    country_code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
      allowNull: false
    },
    invest: {
      type: DataTypes.INTEGER(),
      allowNull: true,
      defaultValue: 0
    },
    is_active: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  })
  return User;
});