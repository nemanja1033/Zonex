type WordmarkProps = {
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md'
  className?: string
}

export default function Wordmark({ theme = 'light', size = 'md', className = '' }: WordmarkProps) {
  const isLight = theme === 'light'
  const sizeClass = size === 'sm' ? 'text-small' : 'text-body'
  const textClass = isLight ? 'text-white' : 'text-textDark'
  const subClass = isLight ? 'text-white/85' : 'text-muted'

  return (
    <span className={`flex flex-col gap-1 font-display uppercase tracking-[0.24em] ${textClass} ${className}`}>
      <span className={`flex items-center gap-3 ${sizeClass}`}>
        <span className="font-semibold">ZONEX</span>
        <span className={`h-[10px] w-[28px] ${isLight ? 'bg-white/40' : 'bg-border'}`} />
        <span className={`font-light tracking-[0.28em] ${subClass}`}>INŽENJERING</span>
      </span>
      <span className={`text-micro tracking-micro ${subClass}`}>Inženjering d.o.o.</span>
    </span>
  )
}
