type LogoLockupProps = {
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md'
  className?: string
}

export default function LogoLockup({ theme = 'light', size = 'md', className = '' }: LogoLockupProps) {
  const isLight = theme === 'light'
  const textColor = isLight ? 'text-white' : 'text-textDark'
  const muted = isLight ? 'text-white/80' : 'text-muted'
  const iconStroke = isLight ? '#FFFFFF' : '#0E1A25'
  const iconFill = isLight ? 'rgba(255,255,255,0.08)' : 'rgba(11,28,45,0.06)'
  const sizeClass = size === 'sm' ? 'text-small' : 'text-body'

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <svg
        width={size === 'sm' ? 36 : 44}
        height={size === 'sm' ? 36 : 44}
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
      >
        <rect x="1.5" y="1.5" width="41" height="41" rx="6" fill={iconFill} stroke={iconStroke} strokeWidth="1.5" />
        <path d="M11 14H33L16 30H33" stroke={iconStroke} strokeWidth="2" strokeLinecap="square" />
      </svg>
      <div className={`flex flex-col uppercase tracking-[0.26em] ${textColor}`}>
        <span className={`font-display ${sizeClass}`}>ZONEX</span>
        <span className={`text-micro font-mono tracking-micro ${muted}`}>INŽENJERING</span>
      </div>
    </div>
  )
}
