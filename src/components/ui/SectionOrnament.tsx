"use client"

import { RefObject } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type SectionOrnamentProps = {
  targetRef: RefObject<HTMLElement>
  variant?: 'left' | 'right'
}

export default function SectionOrnament({ targetRef, variant = 'left' }: SectionOrnamentProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 0])
  const yStrong = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacityStrong = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.9, 0])
  const x = variant === 'left' ? '-6%' : '6%'

  return (
    <>
      <motion.div
        className={`pointer-events-none absolute ${variant === 'left' ? 'left-0' : 'right-0'} top-8 h-56 w-56`}
        style={{ y, opacity }}
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_top,rgba(155,14,28,0.2),transparent_70%)]" />
      </motion.div>
      <motion.div
        className={`pointer-events-none absolute ${variant === 'left' ? 'left-[-4%]' : 'right-[-4%]'} top-[30%] h-72 w-72`}
        style={{ y: yStrong, opacity: opacityStrong }}
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_top,rgba(10,10,12,0.22),transparent_70%)]" />
      </motion.div>
    </>
  )
}
