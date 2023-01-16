import { GraphQLError } from "graphql";

export default (error) => {
	// (1) Validation Errors
	if (error.name == "ValidationError") {
		const errors = error.details.map((error) => error.message);

		return new GraphQLError(errors, { extensions: { http: { status: 422 } } });
	}

	// (2) Duplicates Errors
	if (error.name == "MongoServerError" && error.message.includes("E11000")) {
		const value = Object.values(error.keyValue);

		return new GraphQLError(`Duplicate value (${value})`, {
			extensions: { http: { status: 422 } },
		});
	}

	// (3) Type Errors (Like not providing data object in query/mutation
	if (error.name == "TypeError") {
		return new GraphQLError("Data Object Not Found in Query/ Mutation", {
			extensions: { http: { status: 400 } }, // Bad request
		});
	}

	console.error("Error Name:", error.name);
	console.error("Error Message:", error.message);

	return new GraphQLError("Something went wrong.", {
		extensions: { http: { status: 500 } },
	});
};
