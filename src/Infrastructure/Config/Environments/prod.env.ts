import { AppEnvironmentInterface } from "./Types";

const appConfig: AppEnvironmentInterface = {
	db: {
		baseUrl: process.env.MONGODB_URI + "_production",
	},
	host: {
		port: +process.env.PORT_PROD,
	},
};

export default appConfig;
