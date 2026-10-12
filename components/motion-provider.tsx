"use client"

import { MotionConfig } from "motion/react"

// Honour the visitor's reduced-motion setting across every animation.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
