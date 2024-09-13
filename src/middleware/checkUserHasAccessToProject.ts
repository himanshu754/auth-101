import {
    NextFunction, Request, Response,
} from "express";
import { ERROR_CODES } from "helpers/messageConstants/errorCodesMessages";
import { sendErrorResponse } from "helpers/responseHandler";

async function checkUserHasAccessToProjectMiddleware(req: Request, res: Response, next: NextFunction) {
       
        // const resError = {
        //     status: ERROR_CODES.BAD_REQUEST_ERROR,
        //     message: "Project is inactive please contact the administrator",
        // };
        // return sendErrorResponse(res, resError);
        if(req){
            const resError = {
                status: ERROR_CODES.BAD_REQUEST_ERROR,
                message: "User has not access to project",
            };
            return sendErrorResponse(res, resError);
        }
    next();
}

export {
    checkUserHasAccessToProjectMiddleware,
};
