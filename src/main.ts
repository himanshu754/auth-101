import { readFileSync } from "fs";
import * as http from "http";
import { createServer } from "https";
import path from "path";

import { app } from "app";
import { serverConfig } from "config";
import { connectDb } from "config/dataSourceConfig/data-source";
// import { redisSeeder } from "config/redisConfig/redisSeeder";
// import { redisInstance } from "config/redisConfig/redisUtils";
import logger from "utils/logger";

const PORT: number = +serverConfig.port;
const HOST: string = serverConfig.host;

// const isLocal = false;
const isLocal = serverConfig.envType === "local";

async function setUpDatabaseConnection() {
    await connectDb()
        .then(() => {
            logger.info("database connection created successfully");
        })
        .catch((error: any) => logger.info(error));
}

if (isLocal) {
    const httpsOptions = {
        key: readFileSync(path.join(__dirname, "../cert/key.pem")),
        cert: readFileSync(path.join(__dirname, "../cert/cert.pem")),
    };
    const server = createServer(httpsOptions, app)
        .listen(PORT, async () => {
            logger.info(`>>> 🌎 Server started on https://${HOST}:${PORT}`);
            await setUpDatabaseConnection();
            // await redisInstance.initialize();
            // await redisSeeder();
        });

    server.on("error", (error: NodeJS.ErrnoException) => {
        switch (error.code) {
            case "EADDRINUSE":
                logger.info(PORT + " is already in use, exiting the process.");
                break;
            default:
                throw error;
        }
    });
} else {
    const server = http.createServer(app)
        .listen(PORT, async () => {
            logger.info(`>>> 🌎 Server started on http://${HOST}:${PORT}`);
            await setUpDatabaseConnection();
            // await redisInstance.initialize();
            // await redisSeeder();
        });

    server.on("error", (error: NodeJS.ErrnoException) => {
        switch (error.code) {
            case "EADDRINUSE":
                logger.info(PORT + " is already in use, exiting the process.");
                break;
            default:
                throw error;
        }
    });
}

