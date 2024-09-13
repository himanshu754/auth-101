import express from "express";

import {
    TOKEN_TYPE, userEnum, UserStatusEnum,
} from "enums/auth.enum";
import { commonMessages } from "helpers/messageConstants/commonMessages";
import { ERROR_MESSAGES } from "helpers/messageConstants/errorCodesMessages";
import { getReqData } from "helpers/requestHandler";
import {
    sendErrorResponse, sendSuccessResponse,
} from "helpers/responseHandler";
import { createJWTToken } from "middleware/createJWTToken";
import { verifyJWTToken } from "middleware/verifyJWTToken";
import {
    checkExistenceInUserDb, updateUserData,
} from "services/userService";

async function registerController(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const body = getReqData(req, "body");
        const r = body
        sendSuccessResponse(res, r);
    } catch (error) {
        next(error);
    }
}

const verifyUserEmailAction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const input: { token: string } = getReqData(req, "params");

        //validate token with token types
        const tokenData: CommonTypesDef.ITokenError = await verifyJWTToken(res, input.token, TOKEN_TYPE.TEMP_TOKEN);
        if (tokenData.hasError) {
            return sendErrorResponse(res, { message: ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED });
        }

        //check user existence
        const userExist = await checkExistenceInUserDb(userEnum.IdUserInt, tokenData.verifiedToken.idUserInt);
        if (!userExist) {
            return sendErrorResponse(res, { message: commonMessages.INVALID_USER });
        }

        if (userExist.isEmailVerified) {
            return sendErrorResponse(res, { message: "Email already verified" });
        }

        await updateUserData(userExist.idUserInt, {
            isEmailVerified: true,
            status: UserStatusEnum.Active,
        });

        const accessTokenPayload: Token.IAccessTokenPayload = {
            idUserInt: userExist.idUserInt,
            firstName: userExist.firstName,
            email: userExist.email,
            idOrg: userExist.idOrg,
            role: userExist.role,
            tokenType: TOKEN_TYPE.ACCESS_TOKEN,
        };
        const token = createJWTToken(res, accessTokenPayload, TOKEN_TYPE.ACCESS_TOKEN);

        sendSuccessResponse(res, {
            message: "Email verified", data: { token },
        });
    } catch (error) {
        next(error);
    }
};

export {
    registerController,
    verifyUserEmailAction
};
