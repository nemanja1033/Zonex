import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  className?: string
}

export default function Button({ children, href, variant = 'primary', className = '' }: ButtonProps) {
  const styles = variant === 'primary' ? 'button-primary' : 'button-ghost'

  const classes = `group inline-flex min-h-[44px] items-center gap-3 rounded-md px-5 py-3 font-mono text-micro uppercase tracking-micro focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] transition-transform active:scale-[0.98] ${styles} ${className}`

  const content = (
    <>
      <span>{children}</span>
      <span
        className="inline-flex h-3 w-3 items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      >
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3.5 8h9" strokeLinecap="round" />
          <path d="M9 4.5L12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes} prefetch={href.startsWith('/')}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes}>{content}</button>
  )
}
