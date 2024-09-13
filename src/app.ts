"use strict";
import cors from "cors";
import express from "express";

import { logRequestMiddleware } from "middleware/logRequestMiddleware";
import {
    asyncHandler, validateAccessTokenMiddleware,
} from "middleware/validateAccessToken";
import { apiRoutes } from "routes/v1";
import globalErrorHandler from "utils/globalErrorHandler";

const app: express.Application = express();
app.disable("x-powered-by");
// app.use(cors(corsCustomOptions));
app.use(cors());
app.use(function (req, _res, next) {
    req.headers.origin = req.headers.origin || req.headers.host;
    next();
});


app.use(express.json({ limit: "5mb" }));

app.use(express.urlencoded({
    limit: "5mb",
    extended: true,
}));

app.use(express.raw({
    inflate: true,
    limit: "5mb",
    type: "application/json",
}));

app.get("/", (_req: express.Request, res: express.Response) => {
    res.send("server is running");
});

app.use(
    "/api",
    logRequestMiddleware,
    asyncHandler(validateAccessTokenMiddleware),
    // TBD
    // add a middleware which will check if user is exists in that particular project or not- security
    apiRoutes,
);

app.use(globalErrorHandler);

export {
    app,
};
