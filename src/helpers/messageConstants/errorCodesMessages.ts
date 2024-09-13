enum SUCCESS_CODES {
    OK = 200,
}

enum ERROR_CODES {
    BAD_REQUEST_ERROR = 400,
    DATABASE_ERROR = 402,
    INVALID_REQUEST = 404,
    FORBIDDEN = 403,
    ORIGIN_INVALID = 406,
    INTERNAL_SERVER_ERROR = 500,
    ERROR_UNKNOWN_SHOW_TO_USER = 112,
    UNAUTHORIZED = 598,//access token expired or not found
    REFRESH_TOKEN_EXPIRED = 599,//refresh token expired or not found -WILL LOGOUT
}

enum ERROR_MESSAGES {
    DATABASE_ERROR = "Database connection error",
    INVALID_REQUEST = "Invalid Request",
    BAD_REQUEST_ERROR = "Bad Request",
    DATABASE_DUPLICATE_ERROR_MESSAGE = "already exists",
    DB_ERROR = "Something bad happened!",
    FORBIDDEN = "FORBIDDEN",
    TOKEN_INVALID_OR_EXPIRED = "Session is either invalid or expired", // For invalid or expired token
    TOKEN_EXPIRED = "Session token is expired", // For invalid or expired token
    ORIGIN_INVALID = "Please provide valid origin header",
    ACCESS_DENIED = "Access denied",
    PERMISSION_DENIED = "Permission denied",
    ERROR_UNKNOWN_SHOW_TO_USER = "Unknown Error (112)",
    DATA_NOT_FOUND = "Data not found"
}

export {
    ERROR_MESSAGES,
    ERROR_CODES,
    SUCCESS_CODES,
};
