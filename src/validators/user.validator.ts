import {
    body, param,
} from "express-validator";

import {
    inviteMemberEnum, memberUpdateEnum, userEnum, userUpdateEnum,
} from "enums/auth.enum";
import { CommonEnum } from "enums/common.enum";
import { adAccountDataEnum } from "enums/user.enum";
import { commonMessages } from "helpers/messageConstants/commonMessages";
import { customPasswordValidator } from "middleware/passwordMiddleware";

const inviteMemberValidator = () => [
    body(inviteMemberEnum.email)
        .exists()
        .isString(),
    body(inviteMemberEnum.permission)
        .optional(),
    body(inviteMemberEnum.role)
        .optional()
        .isString(),
    body(memberUpdateEnum.projectIds)
        .optional()
        .isArray(),
];

const updateMemberValidator = () => [
    body(memberUpdateEnum.idUserInt)
        .exists()
        .isNumeric(),
    body(memberUpdateEnum.firstName)
        .optional()
        .isString(),
    body(memberUpdateEnum.lastName)
        .optional()
        .isString(),
    body(memberUpdateEnum.password)
        .optional()
        .isString(),
    body(memberUpdateEnum.mobile)
        .optional()
        .isString(),
    body(memberUpdateEnum.status)
        .optional(),
    body(memberUpdateEnum.role)
        .optional()
        .isString(),
    body(memberUpdateEnum.projectIds)
        .optional()
        .isArray(),
];
const pageReqValidator = () => [
    param(CommonEnum.projectId)
        .exists()
        .isNumeric(),
    param(adAccountDataEnum.mediaChannel)
        .exists()
        .isString()
        .withMessage(commonMessages.INVALID_DATA),
    param("actId")
        .exists()
        .isString()
        .withMessage(commonMessages.INVALID_DATA),
];

const adAccountDataValidator = () => [
    body(adAccountDataEnum.idAccountData)
        .exists()
        .isNumeric()
        .withMessage(commonMessages.INVALID_DATA),
    body(adAccountDataEnum.status)
        .exists()
        .isBoolean()
        .withMessage(commonMessages.INVALID_DATA),
    param(adAccountDataEnum.projectId)
        .exists()
        .isNumeric()
        .withMessage(commonMessages.INVALID_DATA),
    param(adAccountDataEnum.mediaChannel)
        .exists()
        .isString()
        .withMessage(commonMessages.INVALID_DATA),
];

const pageDataValidator = () => [
    body("actId")
        .exists()
        .isString()
        .withMessage(commonMessages.INVALID_DATA),
    body("pageId")
        .exists()
        .isString()
        .withMessage(commonMessages.INVALID_DATA),
    param(adAccountDataEnum.projectId)
        .exists()
        .isNumeric()
        .withMessage(commonMessages.INVALID_DATA),
    param(adAccountDataEnum.mediaChannel)
        .exists()
        .isString()
        .withMessage(commonMessages.INVALID_DATA),
];

const updateUserValidator = () => [
    body(userUpdateEnum.firstName)
        .optional()
        .isString(),
    body(userUpdateEnum.lastName)
        .optional()
        .isString(),
    body(userUpdateEnum.email)
        .optional()
        .isString(),
    body(userUpdateEnum.mobile)
        .optional()
        .isString(),
    body(userUpdateEnum.profilePic)
        .optional()
        .isString(),
    body(userUpdateEnum.taxId)// New columns added
        .optional()
        .isString(),
    body(userUpdateEnum.vatNo)// New columns added
        .optional()
        .isString(),
    body(userUpdateEnum.companyName)
        .optional()
        .isString(),
    body(userUpdateEnum.marketingConsent)
        .optional()
        .isBoolean(),
    body(userUpdateEnum.termsAndConditions)
        .optional()
        .isBoolean(),

];
const updatePasswordValidator = () => [
    body(userEnum.oldPassword)
        .exists()
        .withMessage(commonMessages.INVALID_PASSWORD)
        .custom(customPasswordValidator),
    body(userEnum.password)
        .exists()
        .withMessage(commonMessages.INVALID_PASSWORD)
        .custom(customPasswordValidator),
];
export {
    inviteMemberValidator,
    updateMemberValidator,
    adAccountDataValidator,
    updateUserValidator,
    updatePasswordValidator,
    pageReqValidator,
    pageDataValidator,
};
