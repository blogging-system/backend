export default async function validate(validator, args: any) {
	return await validator.validateAsync(args, { abortEarly: false });
}
