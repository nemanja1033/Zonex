import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Industrial Charcoal Dark Theme
        base: '#0A0A0A',
        elevated: '#111111',
        card: '#1A1A1A',
        hover: '#242424',
        input: '#1A1A1A',

        // Zonex Red - Brand color
        zonex: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#601414',
          DEFAULT: '#DC2626',
          bg: 'rgba(220, 38, 38, 0.1)',
          border: 'rgba(220, 38, 38, 0.25)',
        },

        // Concrete/Industrial grays
        concrete: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0A0A0A',
        },

        // Legacy color mappings
        void: {
          base: '#0A0A0A',
          obsidian: '#0A0A0A',
          charcoal: '#111111',
          slate: '#1A1A1A',
        },
        navy: {
          900: 'var(--bg-base)',
          800: 'var(--bg-elevated)',
          700: 'var(--bg-card)',
        },
        grey: {
          100: 'var(--bg-elevated)',
          200: 'var(--bg-card)',
        },
        accent: 'var(--brand-red)',
        accentSoft: 'var(--brand-red-bg)',
        accentBorder: 'var(--brand-red-border)',
        accentFg: 'var(--text-primary)',
        border: 'var(--border-light)',
        textDark: 'var(--text-primary)',
        textLight: 'var(--text-primary)',
        muted: 'var(--text-tertiary)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        h1: ['var(--h1-size)', { lineHeight: 'var(--h1-lh)', letterSpacing: 'var(--h1-ls)' }],
        h2: ['var(--h2-size)', { lineHeight: 'var(--h2-lh)', letterSpacing: 'var(--h2-ls)' }],
        h3: ['var(--h3-size)', { lineHeight: 'var(--h3-lh)', letterSpacing: 'var(--h3-ls)' }],
        h4: ['var(--h4-size)', { lineHeight: 'var(--h4-lh)' }],
        body: ['var(--body-size)', { lineHeight: 'var(--body-lh)' }],
        small: ['var(--small-size)', { lineHeight: 'var(--small-lh)' }],
        micro: ['var(--micro-size)', { lineHeight: 'var(--micro-lh)' }],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
        glow: 'var(--glow-red-sm)',
        'glow-md': 'var(--glow-red-md)',
        'glow-lg': 'var(--glow-red-lg)',
      },
      letterSpacing: {
        micro: '0.28em',
        tight: '-0.02em',
        tighter: '-0.04em',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'skeleton': 'skeleton-shine 1.8s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'power4': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #DC2626, #EF4444, #B91C1C, #EF4444, #DC2626)',
      },
    },
  },
  plugins: [],
}

export default config
