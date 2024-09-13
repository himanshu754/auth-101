import {
    NextFunction, Request, Response,
} from "express";

import { logTypeEnum } from "enums/log.enum";
import { commonMessages } from "helpers/messageConstants/commonMessages";
import { getReqData } from "helpers/requestHandler";
import { sendSuccessResponse } from "helpers/responseHandler";
import { saveLogsService } from "services/logs.service";
import { IUserInterface } from "types/user";

async function inviteMemberController(req: Request, res: Response, next: NextFunction) {
    try {
        const body: IUserInterface.IInviteMemberReq = getReqData(req, "body");
        // await inviteMemberService(body, req.decodedToken);
        await saveLogsService({
            mediaChannel: "not specified",
            action: "User Management",
            message: `${body.email} for role: ${body.role} has been invited by ${req.decodedToken.firstName}`,
            logEvent: "User Invited",
            logType: "User",
            logStatus: logTypeEnum.Success,
            orgId: req.decodedToken.idOrg,
        });

        sendSuccessResponse(res, {
            data: null,
            message: commonMessages.INVITE_MEMBER,
        });
    } catch (error) {
        next(error);
    }
}


async function updateUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const body = getReqData(req, "body");
        // const r = await updateUserService(body, req.decodedToken);
        const r = body
        sendSuccessResponse(res, {
            data: r,
            message: commonMessages.USER_UPDATED,
        });
    } catch (error) {
        next(error);
    }
}

export {
    inviteMemberController,
    updateUserController
};
