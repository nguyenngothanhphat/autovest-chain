/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Model, Sequelize } from "sequelize";

export default class BaseModel<T extends {}, TCreation extends {} = {}> extends Model<T, TCreation> {
    constructor(...args: any[]) {
        super(...args)
    }

    static associate(models: Sequelize['models']) {}
}