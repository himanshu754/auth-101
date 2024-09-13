import * as express from "express";

import { authRouter } from "./auth.router";
import { logsRouter } from "./logs.router";
import { userRouter } from "./user.router";

const apiRoutes = express.Router();

apiRoutes.use(
    "/auth",
    authRouter,
);

apiRoutes.use(
    "/user",
    userRouter,
);


apiRoutes.use(
    "/logs",
    logsRouter
);

export {
    apiRoutes,
};
