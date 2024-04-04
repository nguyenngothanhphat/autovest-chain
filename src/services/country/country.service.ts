/* Import packages */
import { Order, WhereOptions } from "sequelize";
/* Import database */
import Database from "../../database";
import { CountryAttributes } from "../../database/models/countries.model";
/* Import configs */
import { ServiceWithContext } from "../core/ServiceWithContent";

interface SortParams {
  field: string
  order: 'ASC' | 'DESC'
}

export default class CountryService extends ServiceWithContext {
  async list(limit: number, offset: number, where?: WhereOptions<CountryAttributes>, sort?: SortParams) {
    const order = sort?.field ? [[sort.field, sort.order]] : [];
    return Database.countries.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [...order] as Order,
      where,
      transaction: this.context?.transaction
    })
  }
}