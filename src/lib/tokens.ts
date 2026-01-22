export const colors = {
  bg: 'var(--bg)',
  bgAlt: 'var(--bg-2)',
  surface1: 'var(--surface-1)',
  surface2: 'var(--surface-2)',
  surface3: 'var(--surface-3)',
  text: 'var(--text)',
  textMuted: 'var(--text-2)',
  textSoft: 'var(--muted)',
  accent: 'var(--accent)',
  accentSoft: 'var(--accentSoft)',
  accentBorder: 'var(--accentBorder)',
  stroke: 'var(--stroke)',
  strokeStrong: 'var(--stroke-2)',
} as const

export const spacing = {
  xs: 'var(--space-xs)',
  sm: 'var(--space-sm)',
  md: 'var(--space-md)',
  lg: 'var(--space-lg)',
  xl: 'var(--space-xl)',
  xxl: 'var(--space-2xl)',
  xxxl: 'var(--space-3xl)',
  huge: 'var(--space-4xl)',
} as const

export const radii = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
} as const

export const shadows = {
  soft: 'var(--shadow-soft)',
  card: 'var(--shadow-card)',
} as const

export const typography = {
  h1: 'var(--h1-size)',
  h2: 'var(--h2-size)',
  h3: 'var(--h3-size)',
  h4: 'var(--h4-size)',
  body: 'var(--body-size)',
  small: 'var(--small-size)',
  micro: 'var(--micro-size)',
} as const

export const fonts = {
  display: 'var(--font-space)',
  body: 'var(--font-inter)',
  mono: 'var(--font-jetbrains-mono)',
} as const

export const tokens = {
  colors,
  spacing,
  radii,
  shadows,
  typography,
  fonts,
} as const
