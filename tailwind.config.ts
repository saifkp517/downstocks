import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
		}
	},
	plugins: [
		require('tailwindcss-animate'),
		plugin(function ({
			addUtilities,
			theme,
		}: {
			addUtilities: (utilities: Record<string, unknown>) => void;
			theme: (path: string) => Record<string, string | Record<string, string>>;
		}) {
			const scrollbarUtilities: Record<string, Record<string, string | Record<string, string>>> = {
				'.scrollbar-thin': {
					'scrollbar-width': 'thin',
				},
				'.scrollbar-auto': {
					'scrollbar-width': 'auto',
				},
				'.scrollbar-none': {
					'scrollbar-width': 'none',
				},
			};

			// Generate scrollbar-color utilities for all theme colors
			const colors = theme('colors');
			Object.keys(colors).forEach((color) => {
				const colorValue = colors[color];
				if (typeof colorValue === 'object' && colorValue !== null) {
					Object.keys(colorValue).forEach((shade) => {
						scrollbarUtilities[`.scrollbar-${color}-${shade}`] = {
							'scrollbar-color': `${(colorValue as Record<string, string>)[shade]} transparent`,
						};
						scrollbarUtilities[`.scrollbar-track-${color}-${shade}`] = {
							'scrollbar-color': `transparent ${(colorValue as Record<string, string>)[shade]}`,
						};
						scrollbarUtilities[`.scrollbar-thumb-hover-${color}-${shade}`] = {
							'&::-webkit-scrollbar-thumb:hover': {
								background: (colorValue as Record<string, string>)[shade],
							},
						};
					});
				}
			});

			addUtilities(scrollbarUtilities);
		}),
	],
};
export default config;
