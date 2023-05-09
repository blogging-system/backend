/**
 * Defines the structure of the database and host for the application environment.
 */
export interface AppEnvironmentInterface {
	db: {
		baseUrl: string;
	};
	host: {
		port: number;
	};
}

/**
 * Defines the available environments for the application.
 */
export type Environment = "testing" | "development" | "production";
