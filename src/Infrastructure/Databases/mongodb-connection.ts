import mongoose from "mongoose";
import appEnv from "./../Config/Environments";

/**
 * The configuration for connecting to a MongoDB database.
 *
 * @public
 * @class
 */
class MongoConnection {
	/**
	 * Connects to a MongoDB database using the MONGO_URI environment variable.
	 *
	 * @returns {Promise<void>} A promise that resolves when the connection is successful.
	 */
	static async connect(): Promise<void> {
		mongoose.set("strictQuery", false);

		await mongoose.connect(appEnv.db.baseUrl, {
			connectTimeoutMS: 30000,
		});
	}

	/**
	 * Drops the currently connected database.
	 *
	 * @returns {Promise<void>} A promise that resolves when the database is dropped.
	 */
	static async dropDatabase(): Promise<void> {
		return await mongoose.connection.dropDatabase();
	}

	/**
	 * Drops a specified collection from the currently connected database.
	 *
	 * @param {string} collectionName - The name of the collection to drop.
	 * @returns {Promise<void>} A promise that resolves when the collection is dropped.
	 */
	static async dropCollection(collectionName: string): Promise<void> {
		return await mongoose.connection.dropCollection(collectionName);
	}

	/**
	 * Disconnects from the currently connected MongoDB database.
	 *
	 * @returns {Promise<void>} A promise that resolves when the disconnection is successful.
	 */
	static async disconnect(): Promise<void> {
		return await mongoose.disconnect();
	}

	/**
	 * Closes the MongoDB database connection.
	 *
	 * @returns {Promise<void>} A promise that resolves when the connection is closed.
	 */
	static async closeConnection(): Promise<void> {
		return await mongoose.connection.close();
	}
}

export default MongoConnection;
