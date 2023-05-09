import { createServer } from "http";
import MongoConnection from "../Infrastructure/Databases/mongodb-connection";
import appEnv from "../Infrastructure/Config/Environments";
import app from "./app";

const server = createServer(app);

const startServer = async () => {
	try {
		await MongoConnection.connect();
		server.listen(appEnv.host.port, () => {
			console.info(
				`Server is running on "${process.env.HOST}:${appEnv.host.port}/" in "${process.env.NODE_ENV}" environment`
			);
		});
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};

startServer();
