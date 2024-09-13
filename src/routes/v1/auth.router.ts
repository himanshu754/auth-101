import * as express from "express";

import { loginAction } from "controllers/auth/login";
import { logoutAction } from "controllers/auth/logout";
import { getNewRefreshTokenAction } from "controllers/auth/newRefreshToken";
import {
    registerController, verifyUserEmailAction,
} from "controllers/auth/registerUser";
import { resetPasswordAction } from "controllers/auth/resetPassword";
import { verifyUserAction } from "controllers/auth/verifyUser";
import { checkExpressValidation } from "middleware/expressValidatorMiddleware";
import {
    loginCredentialValidator, verifyUserValidator, registerValidator, tokenPasswordValidator,
} from "validators/auth.validator";

const authRouter = express.Router();

authRouter.post(
    "/login",
    loginCredentialValidator(),
    checkExpressValidation,
    loginAction,
);

authRouter.post(
    "/register",
    registerValidator(),
    checkExpressValidation,
    registerController
);


authRouter.put(
    "/verify-user/:token",
    verifyUserValidator(),
    checkExpressValidation,
    verifyUserAction,
);

authRouter.put(
    "/verify-email/:token",
    verifyUserValidator(),
    checkExpressValidation,
    verifyUserEmailAction,
);

authRouter.get(
    "/logout",
    logoutAction,
);

authRouter.get(
    "/refresh-token/:refreshToken",
    getNewRefreshTokenAction,
);

authRouter.put(
    "/reset-password",
    tokenPasswordValidator(),
    checkExpressValidation,
    resetPasswordAction,
);

export {
    authRouter,
};
