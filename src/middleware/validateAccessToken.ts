import * as express from "express";

import { TOKEN_TYPE } from "enums/auth.enum";
import { getJwtDecodedToken } from "helpers/authUtils/jwt-helper";
import { getJwtToken } from "helpers/requestHandler";

import { verifyJWTToken } from "./verifyJWTToken";

import { serverConfig } from "../config";
import * as responseHandler from "../helpers/responseHandler";

const validateAccessTokenMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (serverConfig.envType === "test" || req.originalUrl.startsWith("/api/auth")) {
        next();
        return;
    }

    const accessToken = getJwtToken(req);

    const tokenRes = await verifyJWTToken(res, accessToken, TOKEN_TYPE.ACCESS_TOKEN);

    if (tokenRes.hasError) {
        return responseHandler.sendErrorResponse(res, {
            status: tokenRes?.errCode,
            message: tokenRes?.errMessage,
        });
    }

    const decodedToken = getJwtDecodedToken<Token.IAccessTokenPayload>(accessToken);

    if (decodedToken) {
        req.decodedToken = decodedToken;
    }
    next();
};

//for async errors i.e., it will catch async errors
const asyncHandler = (fn: express.RequestHandler) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next))
        .catch(next);

export {
    validateAccessTokenMiddleware,
    asyncHandler,
};
