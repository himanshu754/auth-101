import path from "path";

import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

// import { entities } from "./src/db/entities";
const x = path.join(__dirname, ".env");

dotenv.config({ path: x });

export const AppDataSource = new DataSource({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    type: "postgres",
    // entities: entities,
    logging: false,
    // synchronize: false,
    migrationsRun: false,
    migrations: ["dist/**/migrations/*.js"],
});
