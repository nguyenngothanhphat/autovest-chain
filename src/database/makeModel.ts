import { Sequelize } from "sequelize/types"

export const MODEL_SYMBOL = Symbol('model')

type ModelBuilder = (sequelize: Sequelize) => any

const makeModel = (fn: ModelBuilder) => {
    fn.prototype = fn.prototype || {}
    fn.prototype[MODEL_SYMBOL] = true
    return fn
}

// just a dummy function to identify the model builder
export default makeModel