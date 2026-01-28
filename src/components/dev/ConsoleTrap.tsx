"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { getMotionLevel } from '@/lib/motionLevel'

export default function ConsoleTrap() {
  const pathname = usePathname()
  const routeRef = useRef(pathname)

  useEffect(() => {
    routeRef.current = pathname
  }, [pathname])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const handleError = (event: ErrorEvent) => {
      console.error('[console-trap]', {
        type: 'error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        route: routeRef.current,
        motionLevel: getMotionLevel(),
      })
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error('[console-trap]', {
        type: 'unhandledrejection',
        reason: event.reason,
        stack: event.reason?.stack,
        route: routeRef.current,
        motionLevel: getMotionLevel(),
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  return null
}
