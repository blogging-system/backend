import { createServer } from "http";
import MongoConnection from "../Infrastructure/Databases/mongodb-connection";

import app from "./app";

const server = createServer(app);

const startServer = async () => {
	try {
		await MongoConnection.connect();
		server.listen(process.env.PORT, () => {
			console.info(
				`Server is running on "${process.env.HOST}:${process.env.PORT}/" in "${process.env.NODE_ENV}" environment`
			);
		});
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};

startServer();
