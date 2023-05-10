import { ValidationException } from "../Exceptions";

export default async function validateInput(validator, args: any) {
	try {
		return await validator.validateAsync(args, { abortEarly: false });
	} catch (error) {
		if (error && error.details) throw new ValidationException(error.details.map((err) => err.message));
	}
}
