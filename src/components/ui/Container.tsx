import { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container-max)] pl-[calc(var(--container-padding)+env(safe-area-inset-left))] pr-[calc(var(--container-padding)+env(safe-area-inset-right))] ${className}`}
    >
      {children}
    </div>
  )
}
