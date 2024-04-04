/* Import packages */
import { Request, Response } from "express";
/* Import database */
import { CountryAttributes } from "../../database/models/countries.model";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
import { ListRequestQuery, convertQueryToPagination } from "../../utils/pagination";
import { convertFilterToWhereOptions } from '../../utils/query';
import { WhereOptions as ClientWhereOptions } from "../../types/filter";
/* Import services */
import CountryService from "../../services/country/country.service";

type FilterType = ClientWhereOptions<CountryAttributes>;

export const list = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const query = req.query;
  const { pagination, filter, sort } = query;
  const { offset, pageSize } = convertQueryToPagination(pagination as ListRequestQuery);
  const whereOptions: any = filter && convertFilterToWhereOptions<CountryAttributes>(filter as FilterType);
  const countryService = new CountryService(context);
  const countries = await countryService.list(pageSize, offset, whereOptions, sort as any);
  await commit();
  res.json({
    total: countries.count,
    data: countries.rows
  })
});