"use client"

import { motion, type HTMLMotionProps } from "motion/react"

const ease = [0.22, 1, 0.36, 1] as const

/** Fades and lifts its children into place once, as they scroll into view. */
export function Reveal({
  delay = 0,
  y = 18,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...props}
    />
  )
}

/** A horizontal rule that draws itself from left to right. */
export function DrawRule({
  className,
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease, delay }}
    />
  )
}
