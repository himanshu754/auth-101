import * as express from "express";
import { DateTime } from "luxon";

import {
    TOKEN_TYPE, UserStatusEnum, userEnum,
} from "enums/auth.enum";
import {
    deleteRefreshTokenByUserId, getTokenData,
} from "services/authConnectionService/authService";
import { checkExistenceInUserDb } from "services/userService";

import { commonMessages } from "../../helpers/messageConstants/commonMessages";
import {
    ERROR_CODES,
    ERROR_MESSAGES,
} from "../../helpers/messageConstants/errorCodesMessages";
import {
    getIpAddress, getReqData,
} from "../../helpers/requestHandler";
import * as responseHandler from "../../helpers/responseHandler";
import { createJWTToken } from "../../middleware/createJWTToken";
import { verifyJWTToken } from "../../middleware/verifyJWTToken";

const getNewRefreshTokenAction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { refreshToken } = getReqData(req, "params");
        if (!refreshToken) {
            console.error("refresh token not found");
            return responseHandler.sendErrorResponse(res, {
                message: "refresh token not found", status: ERROR_CODES.REFRESH_TOKEN_EXPIRED,
            });
        }
        //validate refresh token
        const tokenData: CommonTypesDef.ITokenError = await verifyJWTToken(res, refreshToken, TOKEN_TYPE.REFRESH_TOKEN);
        if (!tokenData || tokenData.hasError) {
            console.error("invalid refresh token");
            return responseHandler.sendErrorResponse(res, { message: "invalid refresh token" });
        }
        //validate refresh token with db
        const refreshTokenParts = refreshToken.split(".");
        const validToken = await getTokenData(refreshTokenParts[2]);
        if (!validToken) {
            console.error("token not found in db");

            return responseHandler.sendErrorResponse(res, { message: "token not found in db" });
        }
        // if (validToken.isActive == false && DateTime.fromJSDate(validToken.updatedAt) <= DateTime.utc()
        //     .minus({ seconds: 30 })) {
        //     console.error("token recycled");

        //     return responseHandler.sendErrorResponse(res, { message: "token recycled" });
        // }

        //validate user before alloting new token
        const userExist = await checkExistenceInUserDb(userEnum.IdUserInt, tokenData.verifiedToken.userId);
        if (!userExist) {
            console.error(commonMessages.INVALID_USER);

            return responseHandler.sendErrorResponse(res, { message: commonMessages.INVALID_USER });
        }

        //user should be active
        if (userExist?.idUserInt) {
            if (userExist?.status !== UserStatusEnum.Active) {
                return responseHandler.sendErrorResponse(res, { message: commonMessages.INVACTIVE_USER });
            }
        }

        //create new access token
        const accessTokenPayload: Token.IAccessTokenPayload = {
            idUserInt: userExist.idUserInt,
            firstName: userExist.firstName,
            email: userExist.email,
            idOrg: userExist.idOrg,
            role: userExist.role,
            tokenType: TOKEN_TYPE.ACCESS_TOKEN,
        };
        const token = createJWTToken(res, accessTokenPayload, TOKEN_TYPE.ACCESS_TOKEN);

        //create new refresh token
        const refTokenPayload: Token.IRefTokenPayload = {
            userId: userExist.idUserInt,
            ipAddress: getIpAddress(req),
            firstName: userExist.firstName,
            createdDate: Date.now(),
        };

        const newRefreshToken = createJWTToken<Token.IRefTokenPayload>(res, refTokenPayload, TOKEN_TYPE.REFRESH_TOKEN);
        const newRefreshTokenParts = newRefreshToken.split(".");
        const tokenInput: Token.IRefTokenReq = {
            idUserInt: userExist.idUserInt,
            refreshToken: newRefreshTokenParts[2],
            firstName: userExist.firstName,
            ipAddress: getIpAddress(req),
            isActive: true,
            createdAt: DateTime.utc()
                .toJSDate(),
            updatedAt: DateTime.utc()
                .toJSDate(),
        };
        console.log(tokenInput)
        await deleteRefreshTokenByUserId(userExist.idUserInt);

        const updated = true
        if (!updated) {
            console.error(ERROR_MESSAGES.DB_ERROR);
            return responseHandler.sendErrorResponse(res, { message: ERROR_MESSAGES.DB_ERROR });
        }

        responseHandler.sendSuccessResponse(res, {
            message: commonMessages.AUTHORIZED,
            data: {
                accessToken: token, refreshToken: newRefreshToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

export {
    getNewRefreshTokenAction,
};
