import { Op, WhereOptions } from "sequelize";
import { WhereOptions as ClientWhereOptions } from "../types/filter";

export const isURLEncoded = (str: string) => {
  try {
    const res = decodeURIComponent(str);
    return res !== str;
  } catch (error) {
    return false;
  }
}

export const convertFilterToWhereOptions = <TAttributes>(input: ClientWhereOptions<TAttributes>): WhereOptions<TAttributes> => {
  const replaceOpKeys = (value: string | boolean | null | object | Array<any>): typeof value => {
    if (!value) return value;
    if (typeof value !== 'object') {
        if (typeof value === 'string' && isURLEncoded(value)) return decodeURIComponent(value);
        return value;
    }
    if (Array.isArray(value)) {
      return value.map((item) => {
        return replaceOpKeys(item);
      });
    } else {
      const cloned: Record<string | symbol, any> = {...value}
      Object.entries(cloned).forEach(([key, child]) => {
        if (key.startsWith('op.')) {
          const op = key.split('.')[1] as keyof (typeof Op);
          const newKey = Op[op];
          delete cloned[key];
          cloned[newKey] = replaceOpKeys(child);
        } else {
          cloned[key] = replaceOpKeys(child);
        }
      })
      return cloned
    }
  }
  return replaceOpKeys({...input}) as WhereOptions<TAttributes>
}