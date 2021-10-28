import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError";

export function errorHandler(err: Error, request: Request, response: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return response.status(err.code).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    messsage: `Internal server error - ${err.message}`
  });
}
