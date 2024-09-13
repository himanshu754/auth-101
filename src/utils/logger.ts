import {
    createLogger, format, transports,
} from "winston";

const {
    combine, timestamp, printf, colorize, errors,
} = format;

function logger() {
    const logFormat = printf(({
        level, message, timestamp, stack,
    }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    const winstonLogger = createLogger({
        format: combine(
            colorize(),
            // timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            timestamp(),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.Console(),
            // new transports.File({ filename: "API.log" }),
        ],
    });

    const wrapper = (original: any) => {
        // add pretty JSON in args
        return (...args: any[]) => original(args.join(" "));
    };

    winstonLogger.error = wrapper(winstonLogger.error);
    winstonLogger.warn = wrapper(winstonLogger.warn);
    winstonLogger.info = wrapper(winstonLogger.info);
    winstonLogger.verbose = wrapper(winstonLogger.verbose);
    winstonLogger.debug = wrapper(winstonLogger.debug);
    winstonLogger.silly = wrapper(winstonLogger.silly);
    return winstonLogger;
}

export default logger();
