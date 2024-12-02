import { Response } from "express";
import { z } from "zod";
import { respond } from "../services";

export const apiErrorHandler = (res: Response, error: any) => {
  if (error instanceof z.ZodError) {
    const zodErrors = error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return respond(res, 400, false, "Validation error", zodErrors);
  }

  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  switch (statusCode) {
    case 400:
      message = message || "Bad Request";
      break;
    case 401:
      message = message || "Unauthorized";
      break;
    case 403:
      message = message || "Forbidden";
      break;
    case 404:
      message = message || "Not Found";
      break;
    case 500:
      message = message || "Internal Server Error";
      break;
    default:
      statusCode = 500;
      message = "Something went wrong";
      break;
  }

  respond(res, statusCode, false, message);
};
