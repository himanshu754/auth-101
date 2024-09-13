import jsonwebtoken from "jsonwebtoken";
import jwtDecode from "jwt-decode";

import { TOKEN_TYPE } from "enums/auth.enum";
import { TOKEN_EXPIRY_TIME } from "helpers/constants";
import { getMidNightDate } from "helpers/timeUtils";

import { serverConfig } from "../../config";

const getTokenInfo = (tokenType: TOKEN_TYPE): Token.ITokenInfo => {
    let expiryTimeStamp: number;
    let secretKey: string;
    switch (tokenType) {
        case TOKEN_TYPE.ACCESS_TOKEN:
            secretKey = serverConfig.keys.JWT_ACCESS_TOKEN;
            expiryTimeStamp = getMidNightDate();
            break;
        case TOKEN_TYPE.REFRESH_TOKEN:
            secretKey = serverConfig.keys.JWT_REFRESH_TOKEN;
            expiryTimeStamp = getMidNightDate();
            break;
        case TOKEN_TYPE.INVITED_USER:
            secretKey = serverConfig.keys.JWT_OTHER_TOKEN;
            expiryTimeStamp = TOKEN_EXPIRY_TIME.INVITED_USER;
            break;
        case TOKEN_TYPE.RESET_PASSWORD:
            secretKey = serverConfig.keys.JWT_OTHER_TOKEN;
            expiryTimeStamp = TOKEN_EXPIRY_TIME.RESET_PASSWORD;
            break;
        case TOKEN_TYPE.TEMP_TOKEN:
            secretKey = serverConfig.keys.JWT_OTHER_TOKEN;
            expiryTimeStamp = TOKEN_EXPIRY_TIME.TEMP_TOKEN;
            break;
        default:
            secretKey = "secretKey";
            expiryTimeStamp = TOKEN_EXPIRY_TIME.DEFAULT;
            break;
    }
    return {
        expiryTimeStamp, secretKey,
    };
};

const {
    sign,
    verify,
} = jsonwebtoken;

const signJwt = (JWTPayLoad: any, secret: string, expiresIn: number) => sign(JWTPayLoad, secret, {
    algorithm: "HS512",
    expiresIn,
});

const getJwtDecodedToken = <T>(token: string | null) => {
    if (token) {
        return jwtDecode<T>(token);
    }
    return null;
};

const verifyJwt = (token: string, secret: string): Promise<any> => new Promise((resolve, reject) => {
    verify(token, secret, (err, decode) => {
        if (err) {
            console.log("token err", err);
            return reject(err);
        }
        return resolve(decode);
    });
});

export {
    signJwt,
    verifyJwt,
    getJwtDecodedToken,
    getTokenInfo,
};
