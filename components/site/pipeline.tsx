"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const stations = [
  {
    index: "00",
    label: "Raw consumer data",
    detail: "10,150 synthetic records · 4 sources",
    href: undefined,
  },
  {
    index: "01",
    label: "Readiness",
    detail: "SQL + Excel",
    href: "#data-readiness",
  },
  {
    index: "02",
    label: "Automation",
    detail: "Python + pandas",
    href: "#data-quality-monitor",
  },
  {
    index: "03",
    label: "Activation & monitoring",
    detail: "Power BI + DAX",
    href: "#media-activation-dashboard",
  },
]

const ease = [0.22, 1, 0.36, 1] as const

/** The site's one-line story: four stations joined by a track that data flows along. */
export function Pipeline() {
  return (
    <div className="relative">
      <p className="eyebrow mb-6">The pipeline</p>

      {/* Track: desktop only. Packets travel along it once it has drawn. */}
      <div aria-hidden className="relative hidden h-px md:block">
        <div className="absolute inset-0 bg-border" />
        <motion.div
          className="absolute inset-0 bg-foreground"
          style={{ transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease, delay: 0.8 }}
        />
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute top-1/2 size-1.5 -translate-y-1/2 bg-signal"
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 7,
              ease: "linear",
              repeat: Infinity,
              delay: 2.6 + i * 2.33,
            }}
          />
        ))}
      </div>

      <ol className="grid grid-cols-1 border-l md:grid-cols-4 md:border-l-0">
        {stations.map((s, i) => {
          const body = (
            <>
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 -left-[5px] size-[9px] -translate-y-1/2 border border-foreground bg-background md:left-0",
                  i === stations.length - 1 && "border-signal bg-signal"
                )}
              />
              <span className="eyebrow">{s.index}</span>
              <span className="font-serif text-2xl leading-tight tracking-[-0.01em] transition-colors group-hover:text-signal">
                {s.label}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {s.detail}
              </span>
            </>
          )
          const cls =
            "group relative flex flex-col gap-1.5 pt-2 pb-6 pl-5 md:pt-6 md:pr-6 md:pb-0 md:pl-0"

          return (
            <motion.li
              key={s.index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.9 + i * 0.25 }}
            >
              {s.href ? (
                <Link href={s.href} className={cls}>
                  {body}
                </Link>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
