import {
    body, param,
} from "express-validator";

import { userEnum } from "enums/auth.enum";
import { customPasswordValidator } from "middleware/passwordMiddleware";

import { projectValidator } from "./common.validator";

import { LENGTH_VALIDATION } from "../helpers/constants";
import { commonMessages } from "../helpers/messageConstants/commonMessages";

const loginCredentialValidator = () => [
    body(userEnum.email)
        .exists()
        .withMessage(commonMessages.EMAIL_IS_REQ)
        .isString()
        .trim()
        .isEmail()
        .withMessage(commonMessages.INVALID_EMAIL)
        .isLength({
            max: LENGTH_VALIDATION.EMAIL_MAX_LENGTH,
            min: LENGTH_VALIDATION.EMAIL_MIN_LENGTH,
        })
        .withMessage(commonMessages.INVALID_LENGTH),
    body(userEnum.password)
        .exists()
        .isLength({
            max: LENGTH_VALIDATION.PASSWORD_MAX_LENGTH,
            min: LENGTH_VALIDATION.PASSWORD_MIN_LENGTH,
        })
        .withMessage(commonMessages.INVALID_LENGTH),
    body("rememberMe")
        .optional()
        .isBoolean(),
];

const checkDataInBody = (data: string) => [
    body(data)
        .exists(),
];

const verifyUserValidator = () => [
    param(userEnum.token)
        .exists(),
    body(userEnum.firstName)
        .optional()
        .isString()
        .trim()
        .isLength({
            min: LENGTH_VALIDATION.NAME_MIN_LENGTH,
            max: LENGTH_VALIDATION.NAME_MAX_LENGTH,
        })
        .withMessage(commonMessages.INVALID_LENGTH),
    body(userEnum.lastName)
        .optional()
        .isString()
        .trim()
        .isLength({
            min: LENGTH_VALIDATION.NAME_MIN_LENGTH,
            max: LENGTH_VALIDATION.NAME_MAX_LENGTH,
        })
        .withMessage(commonMessages.INVALID_LENGTH),
    body(userEnum.mobile)
        .optional()
        .isNumeric()
        .trim()
        .isLength({ max: LENGTH_VALIDATION.NUMBER_MAX_LENGTH }),
    body(userEnum.password)
        .optional()
        .isString(),
    body(userEnum.vatNo)// New columns added
        .optional()
        .isString(),
    // body(userEnum.taxId)// New columns added
    //     .optional()
    //     .isString(),
    body(userEnum.taxId)
        .optional()
        .isString(),
    body(userEnum.companyName)
        .optional()
        .isString(),
    body(userEnum.marketingConsent)
        .optional()
        .isBoolean(),
    body(userEnum.termsAndConditions)
        .optional()
        .isBoolean(),
];

const registerValidator = () => [
    body(userEnum.firstName)
        .isString()
        .trim()
        .isLength({
            min: LENGTH_VALIDATION.NAME_MIN_LENGTH,
            max: LENGTH_VALIDATION.NAME_MAX_LENGTH,
        })
        .withMessage(commonMessages.INVALID_LENGTH),
    body(userEnum.lastName)
        .isString()
        .trim()
        .isLength({
            min: LENGTH_VALIDATION.NAME_MIN_LENGTH,
            max: LENGTH_VALIDATION.NAME_MAX_LENGTH,
        })
        .withMessage(commonMessages.INVALID_LENGTH),
    body(userEnum.mobile)
        .isNumeric()
        .trim()
        .isLength({ max: LENGTH_VALIDATION.NUMBER_MAX_LENGTH }),
    body(userEnum.email)
        .isString()
        .trim()
        .isEmail(),
    body(userEnum.password)
        .isString()
        .custom(customPasswordValidator),
    body(userEnum.vatNo)// New columns added
        .optional()
        .isString(),
    body(userEnum.taxId)// New columns added
        .optional()
        .isString(),
    body(userEnum.companyName)
        .optional()
        .isString(),
    body(userEnum.marketingConsent)
        .optional()
        .isBoolean(),
    body(userEnum.termsAndConditions)
        .optional()
        .isBoolean(),
];

const retryEmailValidator = () => [
    param(userEnum.token)
        .exists(),
    body(userEnum.email)
        .isString()
        .trim()
        .isEmail(),
    body("type")//invited or temp
        .isString(),
];

const accountAuthValidtor = () => [
    body("code")
        .isString()
        .exists(),
    body("authType")
        .isString(),
    ...projectValidator(),
];

const deactivateAccValidator = () => [
    param("authType")
        .isString()
        .exists(),
    ...projectValidator(),
];

const tokenPasswordValidator = () => [
    body("token")
        .exists(),
    body("password")
        .exists()
        .withMessage(commonMessages.INVALID_PASSWORD)
        .custom(customPasswordValidator),
];

export {
    loginCredentialValidator,
    checkDataInBody,
    verifyUserValidator,
    registerValidator,
    accountAuthValidtor,
    deactivateAccValidator,
    retryEmailValidator,
    tokenPasswordValidator,
};
