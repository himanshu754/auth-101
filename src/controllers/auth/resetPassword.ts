import * as express from "express";
import jwtDecode from "jwt-decode";

import {
    TOKEN_TYPE, UserStatusEnum, userEnum,
} from "enums/auth.enum";
import { invalidReqError } from "helpers";
import { getHash } from "helpers/authUtils/bcryptUtils";
import { commonMessages } from "helpers/messageConstants/commonMessages";
import {
    checkExistenceInUserDb, updateUserData,
} from "services/userService";

import { ERROR_MESSAGES } from "../../helpers/messageConstants/errorCodesMessages";
import * as requestHandler from "../../helpers/requestHandler";
import * as responseHandler from "../../helpers/responseHandler";
import { verifyJWTToken } from "../../middleware/verifyJWTToken";

const resetPasswordAction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {
            token, password,
        } = requestHandler.getReqData(req);

        //decode token to get the token type
        const decodedToken: Token.IResetPasswordPayload = jwtDecode(token);
        if (!decodedToken) {
            return responseHandler.sendErrorResponse(res, { message: ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED });
        }

        //validate token with token types
        const errorObj = await verifyJWTToken(res, token, TOKEN_TYPE.RESET_PASSWORD);
        if (errorObj.hasError) {
            return responseHandler.sendErrorResponse(res, { message: ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED });
        }

        //check user existence
        const userExist = await checkExistenceInUserDb(userEnum.IdUserInt, decodedToken.userId);
        if (!userExist) {
            return responseHandler.sendErrorResponse(res, { message: commonMessages.INVALID_USER });
        }

        //check user status should be active
        if (userExist?.status !== UserStatusEnum.Active) {
            return responseHandler.sendErrorResponse(res, { message: commonMessages.INVACTIVE_USER });
        }

        const newToken = token.split(".");
        if (userExist.resetToken?.length == 0 || userExist.resetToken !== newToken[2]) {
            return responseHandler.sendErrorResponse(res, { message: ERROR_MESSAGES.TOKEN_EXPIRED });
        }

        const passwordHash = await getHash(password);

        const passwordUpdated = await updateUserData(userExist.idUserInt, {
            passwordHash,
            resetToken: "",
        });

        if (passwordUpdated) {
            return responseHandler.sendSuccessResponse(res, { message: commonMessages.PASSWORD_UPDATED });
        } else {
            return responseHandler.sendErrorResponse(res, invalidReqError);
        }
    } catch (error) {
        next(error);
    }
};

export {
    resetPasswordAction,
};
