import styles from './LogoLockup.module.css'

type LogoLockupProps = {
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md'
  className?: string
}

export default function LogoLockup({ theme = 'light', size = 'md', className = '' }: LogoLockupProps) {
  const themeClass = theme === 'light' ? styles.light : styles.dark
  const sizeClass = size === 'sm' ? styles.sm : styles.md

  return (
    <div className={`${styles.lockup} ${themeClass} ${sizeClass} ${className}`}>
      <span className={styles.line}>
        <span className={styles.primary}>ZONEX</span>
        <span className={styles.rule} />
        <span className={styles.secondary}>INŽENJERING</span>
      </span>
      <span className={styles.sub}>Inženjering d.o.o.</span>
    </div>
  )
}
