"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { prefetchOnIdle } from '@/lib/prefetchRoutes'

export default function PrefetchRoutes() {
  const router = useRouter()

  useEffect(() => {
    prefetchOnIdle(router.prefetch)
  }, [router])

  return null
}
