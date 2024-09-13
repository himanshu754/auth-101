import { Response } from "express";

import { commonMessages } from "helpers/messageConstants/commonMessages";

import {
    ERROR_CODES,
    ERROR_MESSAGES,
    SUCCESS_CODES,
} from "../messageConstants/errorCodesMessages";

function sendSuccessResponse<T>(
    res: Response,
    r: CommonTypesDef.CommonResponseType<T>,
) {
    const response: CommonTypesDef.CommonResponsePayloadType<T> = {
        message: r?.message || commonMessages.DATA_FETCHED,
        data: r.data || null,
    };
    sendResponse(res, response, r.status || SUCCESS_CODES.OK);
}
function sendErrorResponse(res: Response, e: any) {
    console.log("ERROR: ", e);
    const response: CommonTypesDef.CommonResponsePayloadType<any> = {
        message: e?.message || ERROR_MESSAGES.BAD_REQUEST_ERROR,
        data: null,
        error: e?.error || null,
    };

    sendResponse(res, response, e?.status || ERROR_CODES.BAD_REQUEST_ERROR);
}

function sendResponse<T>(res: Response, body: CommonTypesDef.CommonResponsePayloadType<T>, status = SUCCESS_CODES.OK) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Expose-Header", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(status);
    res.send(body);
}

export {
    sendSuccessResponse,
    sendErrorResponse,
};
