export interface AppEnvironmentInterface {
	db: {
		baseUrl: string;
	};

	host: {
		port: number;
	};
}

export type Environment = "testing" | "development" | "production";
