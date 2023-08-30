/** @type {import("eslint").Linter.Config} */
module.exports = {
	plugins: ["jsdoc"],
	extends: [
		"@remix-run/eslint-config",
		"@remix-run/eslint-config/node",
		"plugin:jsdoc/recommended",
	],
	rules: {
		"jsdoc/require-description": 0,
		"jsdoc/require-returns-description": 0,
		"jsdoc/require-param-description": 0,
		"jsdoc/require-returns": 0,
		"jsdoc/require-jsdoc": 0,
		"jsdoc/tag-lines": 0,
	},
	globals: 0,
};
