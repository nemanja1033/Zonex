import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          base: '#0A0A0A',
          obsidian: '#0E0F12',
          charcoal: '#15171C',
          slate: '#1E2126',
        },
        industrial: {
          orange: '#F36B2C',
          ember: '#FF8A4B',
        },
        navy: {
          900: 'var(--navy-900)',
          800: 'var(--navy-800)',
          700: 'var(--navy-700)',
        },
        grey: {
          100: 'var(--grey-100)',
          200: 'var(--grey-200)',
        },
        accent: 'var(--accent)',
        accentSoft: 'var(--accent-soft)',
        accentBorder: 'var(--accent-border)',
        accentFg: 'var(--accent-fg)',
        border: 'var(--border)',
        textDark: 'var(--text-dark)',
        textLight: 'var(--text-light)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
      },
      letterSpacing: {
        micro: '0.28em',
      },
    },
  },
  plugins: [],
}

export default config
