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
			padding: '0rem',
			screens: {
				// Enforce a single fixed content width across all breakpoints
				'sm': '1400px',
				'md': '1400px',
				'lg': '1400px',
				'xl': '1400px',
				'2xl': '1400px'
			}
		},
			// Fully override font families to use Verdana exclusively
			fontFamily: {
				sans: ['Verdana'],
				serif: ['Verdana'],
				mono: ['Verdana']
			},
			extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Newtifi brand colors
				newtifi: {
					navy: '#0A0A23',
					teal: '#00C2CB',
					white: '#FFFFFF',
					gray: {
						light: '#F5F5F5',
						medium: '#DDDDDD',
						dark: '#333333',
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
				
			fontSize: {
				// Unified 6-size typography system - All body text same size
				'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px - Labels, badges, fine print only
				'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px - ALL body text, paragraphs, descriptions
				'2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px - Section headings, card titles
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px - Page headings, main titles
				'6xl': ['3.75rem', { lineHeight: '1' }],          // 60px - Hero text, display headlines
				
				// Legacy support (deprecated - will be removed)
				'primary': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
				'secondary': ['1.5rem', { lineHeight: '1.3', fontWeight: '400', letterSpacing: '0.05em' }],
				'body': ['1rem', { lineHeight: '1.5', fontWeight: '300' }],
				'small': ['0.875rem', { lineHeight: '1.4', fontWeight: '300' }],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'slow-pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'bump': {
					'0%': { transform: 'translateY(0)' },
					'30%': { transform: 'translateY(-8px)' },
					'70%': { transform: 'translateY(-4px)' },
					'100%': { transform: 'translateY(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.4s ease-out',
				'slow-pulse': 'slow-pulse 3s infinite ease-in-out',
				'bump': 'bump 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
			},
			transitionDuration: {
				'2000': '2000ms',
				'3000': '3000ms',
			},
		}
	},
	plugins: [import("tailwindcss-animate")],
} satisfies Config;
