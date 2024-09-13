import * as express from "express";

import { commonMessages } from "../../helpers/messageConstants/commonMessages";
import * as responseHandler from "../../helpers/responseHandler";

const logoutAction = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // delete all user related token from the table
        responseHandler.sendSuccessResponse(res, { message: commonMessages.USER_LOGGEDOUT });
    } catch (error) {
        next(error);
    }
};

export {
    logoutAction,
};
