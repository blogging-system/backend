import dotenv from "dotenv";

dotenv.config();

import { AppEnvironmentInterface, Environment } from "./Types";
import testEnv from "./test.env";
import devEnv from "./dev.env";
import prodEnv from "./prod.env";

// Use nullish coalescing operator ?? instead of OR operator || to handle the case when NODE_ENV is an empty string
const currentEnv: Environment = (process.env.NODE_ENV as Environment) || "development";

const environments: Record<Environment, AppEnvironmentInterface> = {
	testing: testEnv,
	development: devEnv,
	production: prodEnv,
};

const appEnv = environments[currentEnv];

export default appEnv;
