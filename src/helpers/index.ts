import {
    ERROR_CODES,
    ERROR_MESSAGES,
} from "./messageConstants/errorCodesMessages";

const invalidReqError = {
    status: ERROR_CODES.INVALID_REQUEST,
    message: ERROR_MESSAGES.INVALID_REQUEST,
};

const throwTokenError = (errMessage?: string) => {
    return {
        hasError: true,
        errCode: ERROR_CODES.UNAUTHORIZED,
        errMessage: errMessage ? errMessage : ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED,
    };
};

const isEmpty = (obj: any) => {
    return obj ? Object.keys(obj).length === 0 : true;
};

function getTotalPages(limit: number, totalRecords: number) {
    return limit > 0 ? Math.ceil(totalRecords / limit) : 0;
}

function prettyJSON(obj: any) {
    return obj && JSON.stringify(obj, null, "\t");

}

function convertEnumToObject(_enum: any, defaultValue: any = null) {
    const obj: any = {};
    Object.values(_enum)
        .forEach((i: any) => {
            obj[i] = defaultValue;
        });
    return obj;
}



function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {
    invalidReqError,
    throwTokenError,
    isEmpty,
    getTotalPages,
    prettyJSON,
    convertEnumToObject,
    delay
};
