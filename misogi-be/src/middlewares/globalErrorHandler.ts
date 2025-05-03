import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import {
  httpStatusCodeDetail,
  httpStatusCodeDetailType,
} from "../constants/httpStatusCodes";
import { CustomError } from "../utils/CustomError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error("🔥 Error:", err); 

  if (err instanceof CustomError) {
    const baseResponse =
      httpStatusCodeDetail[err.status as keyof httpStatusCodeDetailType];
    const response = {
      ...baseResponse,
      message: err.message || baseResponse.message,
      error: err.error,
      stack: err.stack,
    };
    res.status(err.status as any).json(response);
  } else {
    const baseResponse = httpStatusCodeDetail[500];
    const response = { ...baseResponse, error: err, stack: err.stack };
    res.status(500).json(response);
  }
};
