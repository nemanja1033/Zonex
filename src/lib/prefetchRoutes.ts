export const primaryRoutes = ['/projects', '/services', '/company', '/contact']

export const prefetchOnIdle = (prefetch: (href: string) => void) => {
  const run = () => primaryRoutes.forEach((route) => prefetch(route))

  if (typeof window === 'undefined') return

  const idleCallback = (globalThis as typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  }).requestIdleCallback

  if (idleCallback) {
    idleCallback(run, { timeout: 1200 })
    return
  }

  globalThis.setTimeout(run, 400)
}
