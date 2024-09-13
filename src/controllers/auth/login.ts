import * as express from "express";

import {
    TOKEN_TYPE, UserStatusEnum,
} from "enums/auth.enum";
import {
    getTokenInfo, signJwt,
} from "helpers/authUtils/jwt-helper";
import { TOKEN_EXPIRY_TIME } from "helpers/constants";
import { checkEmailInDb } from "services/userService";

import * as bcrypt from "../../helpers/authUtils/bcryptUtils";
import { commonMessages } from "../../helpers/messageConstants/commonMessages";
import * as requestHandler from "../../helpers/requestHandler";
import * as responseHandler from "../../helpers/responseHandler";
import { createJWTToken } from "../../middleware/createJWTToken";

const loginAction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const input: ILogin.ILoginReq = requestHandler.getReqData(req);

        //check email exists in db
        const userObject = await checkEmailInDb(input.email.toLowerCase());

        if (!userObject || !userObject.passwordHash || !userObject?.idUserInt) {
            return responseHandler.sendErrorResponse(res, { message: commonMessages.EMAIL_AND_PASSWORD_IS_INCORRECT });
        }

        //check user status should be active for logging in
        if (userObject?.status === UserStatusEnum.Inactive) {
            return responseHandler.sendErrorResponse(res, { message: commonMessages.INVACTIVE_USER });
        }

        //validate entered password
        const check = await bcrypt.checkHash(input.password, userObject.passwordHash);
        if (!check) {
            return responseHandler.sendErrorResponse(res, { message: commonMessages.EMAIL_AND_PASSWORD_IS_INCORRECT });
        }
        if (userObject?.status === UserStatusEnum.Invited) {
            const payload: Token.IInvitedUserPayload = {
                email: userObject.email,
                idUserInt: userObject.idUserInt,
                tokenType: TOKEN_TYPE.TEMP_TOKEN,
            };

            const tokenInfo = getTokenInfo(TOKEN_TYPE.TEMP_TOKEN);
            const expiresIn = input?.rememberMe ? TOKEN_EXPIRY_TIME.REMEMBERED_TOKEN : tokenInfo.expiryTimeStamp;

            const authVerifyToken = signJwt(payload, tokenInfo.secretKey, expiresIn);
            return responseHandler.sendSuccessResponse(res, {
                message: commonMessages.USER_LOGGEDIN, data: { tempToken: authVerifyToken },
            });
        }

        //create access token
        const accessTokenPayload: Token.IAccessTokenPayload = {
            idUserInt: userObject.idUserInt,
            firstName: userObject.firstName,
            email: userObject.email,
            idOrg: userObject.idOrg,
            role: userObject.role,
            tokenType: TOKEN_TYPE.ACCESS_TOKEN,
        };
        const token = createJWTToken(res, accessTokenPayload, TOKEN_TYPE.ACCESS_TOKEN, input.rememberMe);
 

        responseHandler.sendSuccessResponse(res, {
            message: commonMessages.USER_LOGGEDIN, data: { accessToken: token },
        });
    } catch (error) {
        next(error);
    }
};

export {
    loginAction,
};
