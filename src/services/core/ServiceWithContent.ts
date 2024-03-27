import { Transaction } from "sequelize";

export interface IServiceContext {
    transaction?: Transaction
}

export class ServiceWithContext {
    constructor(protected context?: IServiceContext) {}
}