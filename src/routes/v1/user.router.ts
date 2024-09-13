import * as express from "express";

import {
    updateUserController,
} from "controllers/user";
import { updatePasswordAction } from "controllers/user/updatePassword";
import { checkExpressValidation } from "middleware/expressValidatorMiddleware";
import {
 updatePasswordValidator, updateUserValidator,
} from "validators/user.validator";

const userRouter = express.Router();


userRouter.put(
    "/updateUser",
    // validateRolePermission(PERMISSION_MODULE.UPDATE_ROLE),
    updateUserValidator(),
    checkExpressValidation,
    updateUserController,
);

userRouter.put(
    "/update-password",
    // validateRolePermission(PERMISSION_MODULE.UPDATE_ROLE),
    updatePasswordValidator(),
    checkExpressValidation,
    updatePasswordAction,
);

export {
    userRouter,
};
