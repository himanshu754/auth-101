import {
    NextFunction, Request, Response,
} from "express";

import { sendErrorResponse } from "helpers/responseHandler";

import logger from "./logger";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function globalErrorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
    logger.error(error);
    sendErrorResponse(res, error);
}

export default globalErrorHandler;
