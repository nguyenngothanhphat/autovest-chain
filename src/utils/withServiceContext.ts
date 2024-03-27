import Database from "../database";
import { IServiceContext } from "../services/core/ServiceWithContent";

export const withServiceContext = async (fn: (context: IServiceContext, commit: () => Promise<void>) => any) => {
    const transaction = await Database.sequelize.transaction()
    const context: IServiceContext = {
        transaction
    }

    try {
        await fn(context, () => transaction.commit())
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}