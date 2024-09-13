import { param } from "express-validator";

import { logIdEnum } from "enums/log.enum";
import { commonMessages } from "helpers/messageConstants/commonMessages";
const logsIdValidator = () => [
    param(logIdEnum.logId)
        .exists()
        .isNumeric()
        .withMessage(commonMessages.INVALID_DATA),
    param(logIdEnum.projectId)
        .exists()
        .isNumeric()
        .withMessage(commonMessages.INVALID_DATA),

];
export {
    logsIdValidator,
};
