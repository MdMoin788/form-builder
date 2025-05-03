import { Document, Model, PaginateOptions, PaginateResult } from "mongoose";

declare module "mongoose" {
  interface PaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    page?: number;
    totalPages: number;
    nextPage?: number | null;
    prevPage?: number | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }

  interface PaginateOptions {
    select?: object | string;
    sort?: object | string;
    populate?: object[] | string[] | object | string;
    lean?: boolean;
    leanWithId?: boolean;
    offset?: number;
    page?: number;
    limit?: number;
  }

  interface Model<
    TRawDocType,
    TQueryHelpers = {},
    TInstanceMethods = {},
    TVirtuals = {},
    THydratedDocumentType = Document<unknown, TQueryHelpers, TRawDocType>,
    TSchema = any,
  > {
    paginate(
      query?: object,
      options?: PaginateOptions,
      callback?: (err: any, result: PaginateResult<TRawDocType>) => void,
    ): Promise<PaginateResult<THydratedDocumentType>>;
  }
}
