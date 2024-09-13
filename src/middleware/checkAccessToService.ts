import {
    NextFunction, Request, Response,
} from "express";
import { ERROR_CODES } from "helpers/messageConstants/errorCodesMessages";
import { sendErrorResponse } from "helpers/responseHandler";
function checkAccessToServiceMiddleware() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (_req: Request, res: Response, _next: NextFunction) => {
        const message = "Not allowed";
        const resError = {
            status: ERROR_CODES.BAD_REQUEST_ERROR,
            message: message,
        };
        return sendErrorResponse(res, resError);
    };
}

export {
    checkAccessToServiceMiddleware,
};

