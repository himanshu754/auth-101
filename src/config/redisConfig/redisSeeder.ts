import { prettyJSON } from "helpers";
import logger from "utils/logger";

async function redisSeeder() {
    try {
        console.log('seeder')
    } catch (error) {
        logger.error(prettyJSON(error));
    }
}

export {
    redisSeeder,
};
