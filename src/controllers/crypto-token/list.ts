/* Import packages */
import { Request, Response } from "express";
/* Import database */
import { CryptoTokenAttributes } from "../../database/models/crypto_tokens.model";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
import { ListRequestQuery, convertQueryToPagination } from "../../utils/pagination";
import { convertFilterToWhereOptions } from '../../utils/query';
import { WhereOptions as ClientWhereOptions } from "../../types/filter";
/* Import services */
import CryptoTokenService from "../../services/crypto-token/crypto-token.service";

type FilterType = ClientWhereOptions<CryptoTokenAttributes>;

export const list = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const query = req.query;
  const { pagination, filter, sort } = query;
  const { offset, pageSize } = convertQueryToPagination(pagination as ListRequestQuery);
  const whereOptions: any = filter && convertFilterToWhereOptions<CryptoTokenAttributes>(filter as FilterType);
  const cryptoTokenService = new CryptoTokenService(context);
  const token = await cryptoTokenService.list(pageSize, offset, whereOptions, sort as any);
  await commit();
  res.json({
    total: token.count,
    data: token.rows
  })
});