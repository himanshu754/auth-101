import { DataSource } from "typeorm";

import { getDataSourceOptions } from "../../sourceOptions";

export let dbDataSource: DataSource;

export const connectDb = async () => {
    const typormConfig = await getDataSourceOptions();
    dbDataSource = new DataSource(typormConfig);
    return dbDataSource.initialize();
};
