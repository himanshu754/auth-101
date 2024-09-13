
import { DataSourceOptions } from "typeorm";

import { getDbConfig } from "config/dbConfig";
import { entities } from "db/entities";

const getDataSourceOptions = async (): Promise<DataSourceOptions> => {
    const config = getDbConfig();

    return {
        host: config.dbHost,
        port: 5432,
        username: config.dbUserName,
        password: config.dbPassword,
        database: config.dbName,
        type: "postgres",
        entities: entities,
        synchronize: true,
        logging: false,
    };
};

export {
    getDataSourceOptions,
};

