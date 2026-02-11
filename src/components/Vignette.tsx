'use client'

export default function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[3]"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.4) 100%)',
      }}
    />
  )
}
