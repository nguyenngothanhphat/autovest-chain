export class ResponseError {
  name = 'Response Error'
  constructor(
      public status: number,
      public errorKey: string,
      public errors?: string[],
      public ignored?: boolean
  ) {}
}