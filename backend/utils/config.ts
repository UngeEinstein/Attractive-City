import dotenv from "dotenv";
dotenv.config();
/**
 * This file has been changed for the delivery of the source code in the course TDT4290.
 * This was done to hide credentials used for connecting to the database for the project.
 * As a result the project will not function as intended if run locally.
 */

/**
 * Database used for debugging and development.
 */
const DATABASE_DEBUG = "";

/**
 * Database used during execution in GCP environment.
 */
const DATABASE_PROD = "";

/**
 * Database used during automatic testing.
 */
export const DATABASE_TEST = "";

/**
 * Username to connect to database instance with.
 */
const DB_USERNAME = "";

/**
 * Password to connect to database instance with.
 */
const DB_PASSWORD = "";

/**
 * Port used to connect to local proxy.
 */
const DB_PROXY_PORT = 0;

/**
 * Socket path to database instance.
 */
const SOCKET_PATH = "";

let mysqlConfig;
switch (process.env.NODE_ENV) {
  case "debug":
    mysqlConfig = {
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DATABASE_DEBUG,
      // Debug must connect through proxy.
      host: "127.0.0.1",
      port: DB_PROXY_PORT,
      connectionLimit: 5,
    };
    break;
  case "test":
    mysqlConfig = {
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DATABASE_TEST,
      // Test must connect through proxy.
      host: "127.0.0.1",
      port: DB_PROXY_PORT,
      connectionLimit: 5,
    };
    break;
  default:
    mysqlConfig = {
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DATABASE_PROD,
      socketPath: SOCKET_PATH,
      connectionLimit: 10,
    };
    break;
}

export const MYSQL_CONFIG = mysqlConfig;
