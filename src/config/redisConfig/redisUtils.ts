import { createClient } from "redis";

import { serverConfig } from "config";
import { prettyJSON } from "helpers";
import logger from "utils/logger";

class RedisClient {
    private client = createClient();

    public async initialize() {
        this.client = createClient({ url: serverConfig.redisUrl });
        this.client.on("error", err => logger.error("Redis Client Error", prettyJSON(err)));
        await this.client.connect();
        logger.info("Redis client connected");
    }

    public getClient() {
        return this.client;
    }
}

const redisInstance = new RedisClient();

export {
    RedisClient,
    redisInstance,
};
