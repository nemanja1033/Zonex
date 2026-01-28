"use client"

import { createContext, useContext } from 'react'

const RouteTransitionContext = createContext(false)

export const useRouteTransition = () => useContext(RouteTransitionContext)

export default RouteTransitionContext
