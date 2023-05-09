import { AppEnvironmentInterface } from "./Types";

const appConfig: AppEnvironmentInterface = {
	db: {
		baseUrl: process.env.MONGODB_URI + "_testing",
	},
	host: {
		port: +process.env.PORT_TEST,
	},
};

export default appConfig;
