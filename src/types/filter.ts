export type WhereOperators<TValue> = {
  'op.eq'?: TValue
  'op.ne'?: TValue
  'op.is'?: Extract<TValue, null | boolean>
  'op.not'?: TValue
  'op.gte'?: NonNullable<TValue>
  'op.lte'?: NonNullable<TValue>
  'op.lt'?: NonNullable<TValue>
  'op.gt'?: NonNullable<TValue>
  'op.between'?: [NonNullable<TValue>, NonNullable<TValue>]
  'op.notBetween'?: [NonNullable<TValue>, NonNullable<TValue>]
  'op.in'?: ReadonlyArray<NonNullable<TValue>>
  'op.notIn'?: ReadonlyArray<NonNullable<TValue>>
  'op.like'?: Extract<TValue, string>
  'op.notLike'?: Extract<TValue, string>
  'op.iLike'?: Extract<TValue, string>
  'op.notILike'?: Extract<TValue, string>
  'op.startsWith'?: Extract<TValue, string>
  'op.endsWith'?: Extract<TValue, string>
  'op.substring'?: Extract<TValue, string>
  'op.regexp'?: Extract<TValue, string>
  'op.notRegexp'?: Extract<TValue, string>
}

type AllowArray<T> = T | T[];

type AllowNotOrAndRecursive<T> =
| T
| { 'op.or': AllowArray<AllowNotOrAndRecursive<T>> }
| { 'op.and': AllowArray<AllowNotOrAndRecursive<T>> }
| { 'op.not': AllowNotOrAndRecursive<T> };

type AllowNotOrAndWithImplicitAndArrayRecursive<T> = AllowArray<
// this is the equivalent of Op.and
| T
| { 'op.or': AllowArray<AllowNotOrAndWithImplicitAndArrayRecursive<T>> }
| { 'op.and': AllowArray<AllowNotOrAndWithImplicitAndArrayRecursive<T>> }
| { 'op.not': AllowNotOrAndWithImplicitAndArrayRecursive<T> }
>;

export type WhereAttributeHash<TAttributes = any> = {
  // support 'attribute' & '$attribute$'
  [AttributeName in keyof TAttributes as AttributeName extends string ? AttributeName | `$${AttributeName}$` : never]?: WhereAttributeHashValue<TAttributes[AttributeName]>;
} & {
  [AttributeName in keyof TAttributes as AttributeName extends string ?
    // support 'json.path', '$json$.path'
    | `${AttributeName}.${string}` | `$${AttributeName}$.${string}`
    // support 'attribute::cast', '$attribute$::cast', 'json.path::cast' & '$json$.path::cast'
    | `${AttributeName | `$${AttributeName}$` | `${AttributeName}.${string}` | `$${AttributeName}$.${string}`}::${string}`
  : never]?: WhereAttributeHashValue<any>;
} & {
  // support '$nested.attribute$', '$nested.attribute$::cast', '$nested.attribute$.json.path', & '$nested.attribute$.json.path::cast'
  // TODO [2022-05-26]: Remove this ts-ignore once we drop support for TS < 4.4
  // TypeScript < 4.4 does not support using a Template Literal Type as a key.
  //  note: this *must* be a ts-ignore, as it works in ts >= 4.4
  // @ts-ignore
  [attribute: `$${string}.${string}$` | `$${string}.${string}$::${string}` | `$${string}.${string}$.${string}` | `$${string}.${string}$.${string}::${string}`]: WhereAttributeHashValue<any>;
}

export type WhereAttributeHashValue<AttributeType> =
| AllowNotOrAndRecursive<
  // if the right-hand side is an array, it will be equal to Op.in
  // otherwise it will be equal to Op.eq
  // Exception: array attribtues always use Op.eq, never Op.in.
  | AttributeType extends any[]
    ? WhereOperators<AttributeType>['op.eq'] | WhereOperators<AttributeType>
    : (
      | WhereOperators<AttributeType>['op.in']
      | WhereOperators<AttributeType>['op.eq']
      | WhereOperators<AttributeType>
    )
  >
// TODO: this needs a simplified version just for JSON columns
| WhereAttributeHash<any> // for JSON columns

/**
* The type accepted by every `where` option
*/
export type WhereOptions<TAttributes = any> = AllowNotOrAndWithImplicitAndArrayRecursive<WhereAttributeHash<TAttributes>>;