/**
 * Configuration object for the application environment.
 *
 * @interface AppEnvironmentInterface
 * @property {object} db - The configuration object for the database connection.
 * @property {string} db.baseUrl - The base URL for the database connection.
 * @property {object} host - The configuration object for the server host.
 * @property {number} host.port - The port number for the server host.
 */
import { AppEnvironmentInterface } from "./Types";

/**
 * The application configuration for development environment.
 *
 * @type {AppEnvironmentInterface}
 */

const appConfig: AppEnvironmentInterface = {
	db: {
		baseUrl: process.env.MONGODB_URI + "_testing",
	},
	host: {
		port: +process.env.PORT_TEST,
	},
};

export default appConfig;
