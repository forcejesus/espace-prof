
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'var(--colors-purple-500)',
					light: 'var(--colors-purple-300)',
					dark: 'var(--colors-purple-700)',
					foreground: 'var(--colors-white)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				success: {
					DEFAULT: 'var(--colors-green-500)',
					foreground: 'var(--colors-white)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				akili: {
					purple: {
						100: 'var(--colors-purple-100)',
						300: 'var(--colors-purple-300)',
						500: 'var(--colors-purple-500)',
						700: 'var(--colors-purple-700)',
					},
					blue: {
						100: 'var(--colors-blue-100)',
						300: 'var(--colors-blue-300)',
						500: 'var(--colors-blue-500)',
						700: 'var(--colors-blue-700)',
					},
					green: {
						100: 'var(--colors-green-100)',
						300: 'var(--colors-green-300)',
						500: 'var(--colors-green-500)',
						700: 'var(--colors-green-700)',
					},
					orange: {
						50: '#fff7ed',
						100: 'var(--colors-orange-100)',
						300: 'var(--colors-orange-300)',
						500: 'var(--colors-orange-500)',
						700: 'var(--colors-orange-700)',
					},
					yellow: {
						300: 'var(--colors-yellow-300)',
						500: 'var(--colors-yellow-500)',
						700: 'var(--colors-yellow-700)',
					},
					red: {
						300: 'var(--colors-red-300)',
						500: 'var(--colors-red-500)',
						700: 'var(--colors-red-700)',
					},
					teal: {
						300: 'var(--colors-teal-300)',
						500: 'var(--colors-teal-500)',
						700: 'var(--colors-teal-700)',
					},
					grey: {
						0: 'var(--colors-grey-0)',
						50: 'var(--colors-grey-50)',
						200: 'var(--colors-grey-200)',
						300: 'var(--colors-grey-300)',
						400: 'var(--colors-grey-400)',
						500: 'var(--colors-grey-500)',
						600: 'var(--colors-grey-600)',
						700: 'var(--colors-grey-700)',
						800: 'var(--colors-grey-800)',
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// Bordures AKILI
				'akili-sm': 'var(--borderRadius-sm)',
				'akili-md': 'var(--borderRadius-md)',
				'akili-lg': 'var(--borderRadius-lg)',
				'akili-xl': 'var(--borderRadius-xl)',
			},
			spacing: {
				// Espacements AKILI
				's0': 'var(--spacing-s0)',
				's2': 'var(--spacing-s2)',
				's4': 'var(--spacing-s4)',
				's8': 'var(--spacing-s8)',
				's12': 'var(--spacing-s12)',
				's14': 'var(--spacing-s14)',
				's16': 'var(--spacing-s16)',
				's20': 'var(--spacing-s20)',
				's24': 'var(--spacing-s24)',
				's28': 'var(--spacing-s28)',
				's32': 'var(--spacing-s32)',
				's40': 'var(--spacing-s40)',
				's44': 'var(--spacing-s44)',
				's48': 'var(--spacing-s48)',
				's56': 'var(--spacing-s56)',
				's64': 'var(--spacing-s64)',
				's72': 'var(--spacing-s72)',
				's80': 'var(--spacing-s80)',
			},
			fontSize: {
				// Tailles de police AKILI
				'akili-5xl': 'var(--fontSize-5xl)',
				'akili-4xl': 'var(--fontSize-4xl)',
				'akili-3xl': 'var(--fontSize-3xl)',
				'akili-2xl': 'var(--fontSize-2xl)',
				'akili-xl': 'var(--fontSize-xl)',
				'akili-lg': 'var(--fontSize-lg)',
				'akili-md': 'var(--fontSize-md)',
				'akili-sm': 'var(--fontSize-sm)',
				'akili-xs': 'var(--fontSize-xs)',
			},
			fontWeight: {
				// Poids de police AKILI
				'akili-medium': 'var(--fontWeight-medium)',
				'akili-bold': 'var(--fontWeight-bold)',
				'akili-black': 'var(--fontWeight-black)',
			},
			lineHeight: {
				// Hauteurs de ligne AKILI
				'akili-5xl': 'var(--lineHeight-5xl)',
				'akili-4xl': 'var(--lineHeight-4xl)',
				'akili-3xl': 'var(--lineHeight-3xl)',
				'akili-2xl': 'var(--lineHeight-2xl)',
				'akili-xl': 'var(--lineHeight-xl)',
				'akili-lg': 'var(--lineHeight-lg)',
				'akili-md': 'var(--lineHeight-md)',
				'akili-sm': 'var(--lineHeight-sm)',
				'akili-xs': 'var(--lineHeight-xs)',
			},
			boxShadow: {
				// Ombres AKILI
				'akili-sm': 'var(--boxShadow-sm)',
				'akili-md': 'var(--boxShadow-md)',
				'akili-lg': 'var(--boxShadow-lg)',
				'akili-inner-sm': 'var(--boxShadow-innerSm)',
				'akili-inner-md': 'var(--boxShadow-innerMd)',
				'akili-upper-sm': 'var(--boxShadow-upperSm)',
				'akili-upper-md': 'var(--boxShadow-upperMd)',
				soft: "0 4px 20px rgba(70, 23, 143, 0.08)",
				card: "0 8px 30px rgba(70, 23, 143, 0.12)",
				intense: "0 10px 40px rgba(70, 23, 143, 0.15)"
			},
			fontFamily: {
				sans: ['var(--fontFamily-primaryFamily)', 'system-ui', 'sans-serif'],
				akili: ['var(--fontFamily-primaryFamily)'],
			},
			transitionDuration: {
				// Vitesses d'animation AKILI
				'very-fast': 'var(--speeds-veryFast)',
				'fast': 'var(--speeds-fast)',
				'medium-fast': 'var(--speeds-mediumFast)',
				'medium': 'var(--speeds-medium)',
				'medium-slow': 'var(--speeds-mediumSlow)',
				'slow': 'var(--speeds-slow)',
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
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
