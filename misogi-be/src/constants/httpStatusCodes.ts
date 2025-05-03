export const httpStatusCodeDetail = {
  200: {
    success: true,
    status: 200,
    name: "OK",
    message: "Request successful.",
  },
  201: {
    success: true,
    status: 201,
    name: "Created",
    message: "New Record created successfully.",
  },
  204: {
    success: true,
    status: 204,
    name: "No Content",
    message: "Request processed, no content returned.",
  },
  400: {
    success: false,
    status: 400,
    name: "Bad Request",
    message: "Invalid request. Please check your input.",
  },
  401: {
    success: false,
    status: 401,
    name: "Unauthorized",
    message: "Authentication required. Please log in.",
  },
  403: {
    success: false,
    status: 403,
    name: "Forbidden",
    message: "Access denied. You don’t have permission.",
  },
  404: {
    success: false,
    status: 404,
    name: "Not Found",
    message: "Requested resource not found.",
  },
  405: {
    success: false,
    status: 405,
    name: "Method Not Allowed",
    message: "Request method not supported.",
  },
  409: {
    success: false,
    status: 409,
    name: "Conflict",
    message: "Conflict detected. Please try again.",
  },
  500: {
    success: false,
    status: 500,
    name: "Internal Server Error",
    message: "Something went wrong. Try again later.",
  },
  502: {
    success: false,
    status: 502,
    name: "Bad Gateway",
    message: "Server error. Received an invalid response.",
  },
  503: {
    success: false,
    status: 503,
    name: "Service Unavailable",
    message: "Server is temporarily unavailable. Try later.",
  },
  504: {
    success: false,
    status: 504,
    name: "Gateway Timeout",
    message: "Server took too long to respond. Try again.",
  },
};

export type httpStatusCodeDetailType = typeof httpStatusCodeDetail;
type httpStatusCodesType =
  | "ok"
  | "created"
  | "noContent"
  | "badRequest"
  | "unauthorized"
  | "forbidden"
  | "notFound"
  | "methodNotAllowed"
  | "conflict"
  | "internalServerError"
  | "badGateway"
  | "serviceUnavailable"
  | "gatewayTimeout";
export const httpStatusCodes: Record<
  httpStatusCodesType,
  keyof httpStatusCodeDetailType
> = {
  ok: 200, 
  created: 201, 
  noContent: 204,
  badRequest: 400, 
  unauthorized: 401, 
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  conflict: 409, 
  internalServerError: 500,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
};
export type httpStatusCodesTyp = typeof httpStatusCodes;
