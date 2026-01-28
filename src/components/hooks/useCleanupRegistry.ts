import { useCallback, useEffect, useRef } from 'react'

type Cleanup = () => void

export default function useCleanupRegistry() {
  const cleanupsRef = useRef<Cleanup[]>([])

  const register = useCallback((cleanup: Cleanup) => {
    cleanupsRef.current.push(cleanup)
    return cleanup
  }, [])

  const cleanupAll = useCallback(() => {
    const cleanups = cleanupsRef.current.splice(0, cleanupsRef.current.length)
    cleanups.forEach((cleanup) => cleanup())
  }, [])

  useEffect(() => cleanupAll, [cleanupAll])

  return { register, cleanupAll }
}
