import { Response } from "express";
import {
  httpStatusCodeDetailType,
  httpStatusCodeDetail,
} from "../constants/httpStatusCodes";

export const sendResponse = (
  res: Response,
  status: keyof httpStatusCodeDetailType,
  data: any,
  msg?: string,
  extraResponse?:any
) => {
  try {
    const basicResponse = httpStatusCodeDetail[status];
    const response = {
      ...basicResponse,
      message: msg || basicResponse.message,
      data,
      ...extraResponse
    };
    res.status(status).json(response);
  } catch (error) {
    throw error;
  }
};
