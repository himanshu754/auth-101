import * as express from "express";

import {
    TOKEN_TYPE, userEnum, UserStatusEnum,
} from "enums/auth.enum";
import { getHash } from "helpers/authUtils/bcryptUtils";
import { getReqData } from "helpers/requestHandler";
import {
    sendErrorResponse, sendSuccessResponse,
} from "helpers/responseHandler";
import {
    checkExistenceInUserDb, updateUserData,
} from "services/userService";
import { IUserInterface } from "types/user";

import { commonMessages } from "../../helpers/messageConstants/commonMessages";
import { ERROR_MESSAGES } from "../../helpers/messageConstants/errorCodesMessages";
import { verifyJWTToken } from "../../middleware/verifyJWTToken";

const verifyUserAction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const input: IUserInterface.IUpdateUserInput = getReqData(req);
        const { token } = getReqData(req, "params");

        //validate token with token types
        const tokenData: CommonTypesDef.ITokenError = await verifyJWTToken(res, token, TOKEN_TYPE.INVITED_USER);
        if (tokenData.hasError) {
            return sendErrorResponse(res, { message: ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED });
        }

        //check user existence
        const userExist = await checkExistenceInUserDb(userEnum.IdUserInt, tokenData.verifiedToken.idUserInt);
        if (!userExist) {
            return sendErrorResponse(res, { message: commonMessages.INVALID_USER });
        }

        //check if request is valid - user cannot reuse token/mail url for resetting and creating password
        if (input.password && userExist.isPasswordCreated) {
            return sendErrorResponse(res, { message: ERROR_MESSAGES.TOKEN_EXPIRED });
        }

        await updateUserData(userExist.idUserInt, {
            firstName: input.firstName,
            lastName: input.lastName,
            mobile: input.mobile,
            passwordHash: await getHash(input.password),
            isPasswordCreated: true,
            isEmailVerified: true,
            status: UserStatusEnum.Active,
            taxId: input.taxId,
            vatNo: input.vatNo,
            companyName: input.companyName,
            marketingConsent: input.marketingConsent,
            termsAndConditions: input.termsAndConditions,
        });

        sendSuccessResponse(res, { message: commonMessages.USER_REGISTERED });
    } catch (error) {
        next(error);
    }
};

export {
    verifyUserAction,
};
