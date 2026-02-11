'use client'

export default function GridPattern() {
  return (
    <div
      className="grid-pattern pointer-events-none fixed inset-0 z-[1] opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)',
      }}
    />
  )
}
