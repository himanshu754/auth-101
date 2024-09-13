import { dbDataSource } from "config/dataSourceConfig/data-source";
import { Logs } from "db/entities/Logs";

import { User } from "db/entities/User";


const userRepo = () => dbDataSource.getRepository(User);
const logsRepo = () => dbDataSource.getRepository(Logs);

export {
    userRepo,
    logsRepo
};

