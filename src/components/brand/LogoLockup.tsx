type LogoLockupProps = {
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md'
  className?: string
}

export default function LogoLockup({ theme = 'light', size = 'md', className = '' }: LogoLockupProps) {
  const isLight = theme === 'light'
  const textColor = isLight ? 'text-white' : 'text-textDark'
  const muted = isLight ? 'text-white/75' : 'text-muted'
  const sizeClass = size === 'sm' ? 'text-small' : 'text-body'

  return (
    <div className={`flex flex-col ${className}`}>
      <span className={`flex items-center gap-3 font-display uppercase ${textColor}`}>
        <span className={`font-semibold tracking-[0.22em] ${sizeClass}`}>ZONEX</span>
        <span className={`h-[2px] w-8 ${isLight ? 'bg-white/45' : 'bg-border'}`} />
        <span className={`font-light tracking-[0.28em] ${sizeClass} ${muted}`}>INŽENJERING</span>
      </span>
      <span className={`text-micro font-mono uppercase tracking-micro ${muted}`}>Inženjering d.o.o.</span>
    </div>
  )
}
