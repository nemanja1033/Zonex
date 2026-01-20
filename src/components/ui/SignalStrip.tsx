"use client"

type SignalStripProps = {
  className?: string
}

export default function SignalStrip({ className = '' }: SignalStripProps) {
  return <div className={`signal-strip ${className}`} aria-hidden="true" />
}
