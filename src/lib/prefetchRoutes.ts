export const primaryRoutes = ['/projects', '/services', '/company', '/contact']

export const prefetchOnIdle = (prefetch: (href: string) => void) => {
  const run = () => primaryRoutes.forEach((route) => prefetch(route))

  if (typeof window === 'undefined') return

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 1200 })
    return
  }

  window.setTimeout(run, 400)
}
