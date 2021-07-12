import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const connection = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database:
        process.env.NODE_ENV === "test"
            ? process.env.DB_TEST_DATABASE
            : process.env.DB_DATABASE,
});

export default connection;
