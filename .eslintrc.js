module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	rules: {
		"no-console": "off",
		"no-unused-vars": "off",
		"no-mixed-spaces-and-tabs": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",
	},
	env: {
		node: true,
	},
};
