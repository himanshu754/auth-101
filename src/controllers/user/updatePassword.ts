import * as express from "express";

import {
    UserStatusEnum, userEnum,
} from "enums/auth.enum";
import {
    checkHash, getHash,
} from "helpers/authUtils/bcryptUtils";
import {
    checkExistenceInUserDb, updateUserData,
} from "services/userService";

import { commonMessages } from "../../helpers/messageConstants/commonMessages";
import * as requestHandler from "../../helpers/requestHandler";
import * as responseHandler from "../../helpers/responseHandler";

const updatePasswordAction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {
            oldPassword, password,
        } = requestHandler.getReqData(req);

        //check user existence
        const userExist = await checkExistenceInUserDb(userEnum.IdUserInt, req.decodedToken.idUserInt);
        if (!userExist) {
            return responseHandler.sendErrorResponse(res, { message: commonMessages.INVALID_USER });
        }

        //check user status should be active
        if (userExist?.status !== UserStatusEnum.Active) {
            return responseHandler.sendErrorResponse(res, { message: commonMessages.INVACTIVE_USER });
        }

        const check = await checkHash(oldPassword, userExist.passwordHash);
        if (!check) {
            return responseHandler.sendErrorResponse(res, { message: commonMessages.INVALID_PASSWORD });
        }

        const passwordHash = await getHash(password);
        await updateUserData(userExist.idUserInt, { passwordHash });

        responseHandler.sendSuccessResponse(res, { message: commonMessages.PASSWORD_UPDATED });
    } catch (error) {
        next(error);
    }
};

export {
    updatePasswordAction,
};
