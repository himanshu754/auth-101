import { Response } from "express";

import { TOKEN_TYPE } from "enums/auth.enum";
import { TOKEN_EXPIRY_TIME } from "helpers/constants";

import {
    getTokenInfo,
    signJwt,
} from "../helpers/authUtils/jwt-helper";

function createJWTToken<T>(_res: Response, payload: T, tokenType: TOKEN_TYPE, rememberMe = false) {

    const tokenInfo = getTokenInfo(tokenType);
    const expiresIn = rememberMe ? TOKEN_EXPIRY_TIME.REMEMBERED_TOKEN : tokenInfo.expiryTimeStamp;

    if (tokenType == TOKEN_TYPE.ACCESS_TOKEN) {

        const accessToken = signJwt(payload, tokenInfo.secretKey, expiresIn);

        return accessToken;

    } else if (tokenType == TOKEN_TYPE.REFRESH_TOKEN) {

        const newRefreshToken = signJwt(payload, tokenInfo.secretKey, expiresIn);

        return newRefreshToken;
    } else {
        return signJwt(payload, tokenInfo.secretKey, expiresIn);
    }
}

export {
    createJWTToken,
};
