import { ValidationException } from "../Exceptions";

export default async function validateInput(validator, args: any) {
	try {
		return await validator.validateAsync(args, { abortEarly: false });
	} catch (error) {
		throw new ValidationException(error.details.map((err) => err.message));
	}
}
