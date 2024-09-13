declare namespace Express {
    export interface Request {
        decodedToken: Token.IAccessTokenPayload;
    }
}