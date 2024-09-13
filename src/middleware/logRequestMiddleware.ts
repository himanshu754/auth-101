import * as express from "express";

import { prettyJSON } from "helpers";
import logger from "utils/logger";

async function logRequestMiddleware(req: express.Request, _res: express.Response, next: express.NextFunction) {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    logger.info("Request:- ", prettyJSON({
        url: fullUrl,
        headers: req.headers,
        body: req.body,
    }));

    next();
}

export {
    logRequestMiddleware,
};
