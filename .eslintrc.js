/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 17:49:45
 */
module.exports = {
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		camelcase: 'off',
		'@typescript-eslint/camelcase': ['off', { properties: 'always' }],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'prettier/prettier': [
			'error',
			{ endOfLine: 'auto' },
			{
				usePrettierrc: true,
				tabWidth: 2,
				useTabs: true,
			},
		],
	},
}
