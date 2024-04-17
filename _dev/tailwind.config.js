/** @type {import('tailwindcss').Config} */
import { fluidExtractor, fluidCorePlugins, defaultThemeFontSizeInRems } from 'fluid-tailwind';

import plugin from 'tailwindcss/plugin';

const calcRem = (px) => {
	return `${px / 16}rem`;
};

const pxToRem = Object.fromEntries(
	[...Array(2000)].map((_, index) => {
		const px = index + 1;
		return [`${px}ptr`, `${calcRem(px)}`];
	}),
);

module.exports = {
	content: {
		files: ['../mock/front-page/index.html', './src/js/**/*.js'],
		extract: fluidExtractor({
			prefix: 'tw-',
		}),
	},
	prefix: 'tw-',
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {
			colors: {
				black: 'var(--color-dark) /* #141010 */',
				'dark-gray': 'var(--color-dark-gray) /* #1e1c1c */',
				gray: 'var(--color-gray) /* #767070 */',
				'medium-gray': 'var(--color-medium-gray) /* #d9d9d9 */',
				'light-gray': 'var(--color-light-gray) /* #f3f3f3 */',
				white: 'var(--color-white)  /* #fff */',
				'pale-red': 'var(--color-pale-red) /* #eac2c2 */',
				red: 'var(--color-red) /* #d60001 */',
				'dark-red': 'var(--color-dark-red) /* #970304 */',
			},
			lineHeight: {
				normal: '1.4',
				medium: '1.6',
				relaxed: '1.8',
				loose: '2.1',
			},
			fontSize: pxToRem,
			gap: pxToRem,
			margin: pxToRem,
			padding: pxToRem,
			width: pxToRem,
			height: pxToRem,
			maxWidth: pxToRem,
			maxHeight: pxToRem,
			minWidth: pxToRem,
			minHeight: pxToRem,
			size: pxToRem,
		},
		fontSize: defaultThemeFontSizeInRems,
		screens: {
			xxs: calcRem('375'),
			xs: calcRem('480'),
			sm: calcRem('768'),
			md: calcRem('992'),
			lg: calcRem('1200'),
			xl: calcRem('1440'),
			pc: calcRem('1920'),
			maxMd: { max: calcRem('991') },
		},
		letterSpacing: {
			normal: '0.0625em' /* 1px */,
			medium: '0.075em', // "1.2px"
			wide: '0.0875em', // "1.4px"
			wider: '0.1em', // "1.6px"
		},
		fontFamily: {
			en: '"Akshar", sans-serif',
		},
	},
	plugins: [
		fluidCorePlugins,
		plugin(({ addUtilities }) => {
			addUtilities({
				'.mask-icon': {
					maskImage: 'var(--mask-icon)',
					maskRepeat: 'no-repeat',
					maskPosition: 'center',
					maskSize: 'contain',
					display: 'inline-flex',
					flexShrink: '0',
				},
				'.fade-invisible': {
					opacity: '0',
					transition:
						'var(--transition-property, all) var(--transition-duration, 0.3s) var(--transition-timing, ease-in-out) var(--transition-delay, 0s)',
					visibility: 'hidden',
					transform: 'translateY(var(--transformY))',
				},
				'.fade-visible': {
					opacity: '1',
					visibility: 'visible',
					transform: 'translateY(0px)',
				},
			});
		}),
	],
	corePlugins: {
		preflight: false,
	},
};
