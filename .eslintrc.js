const appFiles = ["app/**/*.{js,jsx}"];

/** @type {import("eslint").Linter.Config} */
module.exports = {
	plugins: ["jsdoc"],

	extends: [
		"@remix-run/eslint-config",
		"@remix-run/eslint-config/node",
		"plugin:jsdoc/recommended-typescript-flavor",
	],
	rules: {
		"jsdoc/require-param-description": "off",
		"jsdoc/require-returns": "off",
		"jsdoc/require-jsdoc": "off",
		"jsdoc/tag-lines": "off",
	},
	overrides: [
		{
			files: appFiles,
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.json",
			},
			rules: {
				// Enforce type safety.
				"@typescript-eslint/no-unsafe-member-access": "error",
				"@typescript-eslint/no-unsafe-return": "error",
			},
		},
	],
};
