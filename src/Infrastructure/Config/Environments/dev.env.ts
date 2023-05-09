import { AppEnvironmentInterface } from "./Types";

const appConfig: AppEnvironmentInterface = {
	db: {
		baseUrl: process.env.MONGODB_URI + "_development",
	},
	host: {
		port: +process.env.PORT_DEV,
	},
};

export default appConfig;
