module.exports = {
	trailingComma: 'es5',
	singleQuote: true,
	overrides: [
		{
			files: ['**/*.scss', '**/*.html'],
			options: {
				singleQuote: false,
				tabWidth: 4,
			},
		},
	],
	printWidth: 140,
	trailingComma: 'all',
	arrowParens: 'always',
	semi: true,
	endOfLine: 'lf',
	tabWidth: 2,
};
