"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Pipeline } from "@/components/site/pipeline"

const ease = [0.22, 1, 0.36, 1] as const

function Line({
  children,
  delay,
}: {
  children: React.ReactNode
  delay: number
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function FadeIn({
  children,
  delay,
  className,
}: {
  children: React.ReactNode
  delay: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="grid-paper absolute inset-0 -z-10" />

      <div className="container-page pt-10 pb-16 sm:pt-14 lg:pb-24">
        <FadeIn
          delay={0}
          className="grid grid-cols-2 gap-4 border-b pb-4 md:grid-cols-3"
        >
          <p className="eyebrow">Portfolio</p>
          <p className="eyebrow hidden md:block">
            Three connected learning projects
          </p>
          <p className="eyebrow flex items-center justify-end gap-2">
            <span className="size-1.5 bg-signal" />
            Synthetic data only
          </p>
        </FadeIn>

        <h1 className="mt-10 font-serif text-[clamp(3.4rem,11.5vw,10.75rem)] leading-[0.86] tracking-[-0.025em] sm:mt-14">
          <Line delay={0.1}>Consumer Data</Line>
          <Line delay={0.22}>
            <em className="italic">Readiness</em>
            <span className="text-signal">.</span>
          </Line>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12">
          <FadeIn delay={0.5} className="lg:col-span-7">
            <p className="max-w-2xl font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.12] tracking-[-0.01em]">
              From raw consumer data to activation-ready media intelligence.
            </p>
          </FadeIn>
          <FadeIn
            delay={0.62}
            className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9"
          >
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Three connected learning projects built around NovaCare, a
              fictional Consumer Health company: assess whether consumer data
              is ready for activation, automate the checks, then connect data
              quality with media performance.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="#journey" />}
              >
                Follow the journey
                <ArrowDownIcon data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/projects/data-readiness" />}
              >
                Read case studies
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 lg:mt-24">
          <Pipeline />
        </div>
      </div>
    </section>
  )
}
