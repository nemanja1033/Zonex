import Link from 'next/link'
import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  className?: string
}

export default function Button({ children, href, variant = 'primary', className = '' }: ButtonProps) {
  const styles = variant === 'primary' ? 'button-primary' : 'button-ghost'

  const classes = `group inline-flex items-center gap-3 font-mono text-micro uppercase tracking-micro ${styles} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return <button className={classes}>{children}</button>
}
