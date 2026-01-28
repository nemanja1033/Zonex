import type { ReactNode } from 'react'

type PremiumCardProps = {
  children: ReactNode
  className?: string
}

export default function PremiumCard({ children, className = '' }: PremiumCardProps) {
  return <div className={`card-surface card-hover premium-card ${className}`}>{children}</div>
}
