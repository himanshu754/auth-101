
import * as express from "express";

import {
    getLogsDataController ,
    getLogsIdController,
} from "controllers/logs";
import { checkExpressValidation } from "middleware/expressValidatorMiddleware";
import { paginationValidator } from "validators/common.validator";
import { logsIdValidator } from "validators/logs.validator";

const logsRouter = express.Router();

logsRouter.get(
    "/logId/:logId/:projectId",
    logsIdValidator(),
    checkExpressValidation,
    getLogsIdController
);
logsRouter.get(
    "/getAll/:projectId",
    paginationValidator(),
    checkExpressValidation,
    getLogsDataController,
);

export
{
    logsRouter,
};
