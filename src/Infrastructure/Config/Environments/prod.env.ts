/**
 * Configuration object for the application environment.
 *
 * @typedef {Object} AppEnvironmentInterface
 * @property {Object} db - Database configuration.
 * @property {string} db.baseUrl - The base URL for the MongoDB instance.
 * @property {Object} host - Host configuration.
 * @property {number} host.port - The port to run the application on.
 */
import { AppEnvironmentInterface } from "./Types";

/**
 * The application configuration for production environment.
 *
 * @type {AppEnvironmentInterface}
 */
const appConfig: AppEnvironmentInterface = {
	db: {
		baseUrl: process.env.MONGODB_URI + "_production",
	},
	host: {
		port: +process.env.PORT_PROD,
	},
};

export default appConfig;
