import {
    NextFunction,
    Request,
    Response,
} from "express";
import {
    ValidationError,
    validationResult,
} from "express-validator";

import {
    ERROR_CODES,
    ERROR_MESSAGES,
} from "../helpers/messageConstants/errorCodesMessages";
import * as responseHandler from "../helpers/responseHandler";

function checkExpressValidation(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        const resError = {
            status: ERROR_CODES.INVALID_REQUEST,
            message: getFirstValidationError(error.array()),
            error: error.array({ onlyFirstError: true }),
        };
        return responseHandler.sendErrorResponse(res, resError);
    } else {
        next();
    }
}

function getFirstValidationError(error: ValidationError[]) {
    if (error && error.length > 0) {
        const { msg } = error[0];
        return msg;
    }
    return ERROR_MESSAGES.INVALID_REQUEST;
}

export {
    checkExpressValidation,
};
