import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { BaseError, ValidationError } from "./Error";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  request: Request | undefined,
  response: Response | undefined,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    response?.status(error.status).json({
      status: "fail",
      message: error.message,
      data: error.errorData,
    });
  }
  if (error instanceof BaseError) {
    if (error.isOperational) {
      response?.status(error.status).json({
        status: error.status < 500 && error.status >= 400 ? "fail" : "error",
        message: error.message,
      });
    } else {
      response?.status(error.status).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }
};
