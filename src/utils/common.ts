import express from "express";
import { v4 as uuidv4 } from "uuid";

const asyncHandler = (fn: express.RequestHandler) =>
    (req: express.Request, res: express.Response, next: express.NextFunction) =>
        Promise.resolve(fn(req, res, next))
            .catch(next);

function customError(obj: { status: number, message: string }) {
    const err: any = new Error(obj.message);
    err.body = obj;
    return err;
}

function generateUUID() {
    return uuidv4();
}

export {
    asyncHandler,
    customError,
    generateUUID,
};
