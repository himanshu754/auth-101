import { Request } from "express";
import { matchedData } from "express-validator";

import { serverConfig } from "../../config";
type Location = "body" | "cookies" | "params" | "query";

const getReqData = (req: Request, location: Location = "body", optional = true): any => serverConfig.envType == "test" ? req[location] : matchedData(req, {
    includeOptionals: optional,
    onlyValidData: true,
    locations: [location],
});

const getIpAddress = (req: Request) => req.headers["cf-connecting-ip"]
  || req.headers["x-forwarded-for"] || "";

function getJwtToken(req: Request) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}
export {
    getIpAddress,
    getReqData,
    getJwtToken,
};
