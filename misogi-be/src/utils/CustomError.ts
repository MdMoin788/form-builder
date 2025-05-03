import { httpStatusCodeDetailType } from "../constants/httpStatusCodes";


export class CustomError extends Error {
  public status: keyof httpStatusCodeDetailType;
  public error: any;
  public message: string;
  public textRead?: boolean;

  constructor(
    status: keyof httpStatusCodeDetailType,
    message: string = "",
    textRead: boolean = false,
    err: any = "",
  ) {
    super(message);
    this.status = status;
    this.error = err;
    this.message = message;
    this.textRead = textRead;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
