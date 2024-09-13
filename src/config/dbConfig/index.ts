import { serverConfig } from "config";

const getDbConfig = (): IDbConfig => {
    return {
        dbHost: serverConfig.dbHost,
        dbUserName: serverConfig.dbUserName,
        dbPassword: serverConfig.dbPassword,
        dbName: serverConfig.dbName,
    };
};

export {
    getDbConfig,
};
