import { defaultTo } from "lodash";
import DEFAULT_PAGINATION from "../constants/Pagination";

export type ListRequestQuery = {
  page?: number
  perPage?: number
}

export const convertQueryToPagination = (query?: ListRequestQuery) => {
  const pageSize = defaultTo(Number(query?.perPage), DEFAULT_PAGINATION.LIMIT);
  const pageNumber = defaultTo(Number(query?.page), DEFAULT_PAGINATION.PAGE);
  const offset = pageSize * (pageNumber - 1); 
  return { offset, pageSize };
}