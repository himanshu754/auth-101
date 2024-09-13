import { Response } from "express";
import * as jwt from "jsonwebtoken";

import { TOKEN_TYPE } from "enums/auth.enum";
import { throwTokenError } from "helpers";

import {
    getTokenInfo,
    verifyJwt,
} from "../helpers/authUtils/jwt-helper";
import {
    ERROR_CODES,
    ERROR_MESSAGES,
} from "../helpers/messageConstants/errorCodesMessages";

const verifyJWTToken = async (_res: Response, token: string | null, tokenType: TOKEN_TYPE): Promise<CommonTypesDef.ITokenError> => {
    try {
        if (!token) {
            return throwTokenError("token not found");
        }
        const verifiedToken: Token.IAccessTokenPayload = await verifyJwt(token, getTokenInfo(tokenType).secretKey);

        if (!verifiedToken) {
            return throwTokenError("invalid token");
        }
        if (verifiedToken && verifiedToken.tokenType !== tokenType) {
            return throwTokenError("invalid token type");
        }

        return {
            hasError: false,
            errCode: null,
            errMessage: null,
            verifiedToken,
        };
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return {
                hasError: true,
                errCode: ERROR_CODES.UNAUTHORIZED,
                errMessage: ERROR_MESSAGES.TOKEN_EXPIRED,
                verifiedToken: {},
            };
        }
        return throwTokenError("token error");
    }
};

export {
    verifyJWTToken,
};
