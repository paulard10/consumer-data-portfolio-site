import Link from "next/link"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScreenshotFrame } from "@/components/site/project-preview"
import { DrawRule, Reveal } from "@/components/site/reveal"
import { projects, type Project } from "@/content/projects"

export function Journey() {
  return (
    <section id="journey" className="container-page py-20 lg:py-32">
      <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-3">The journey</p>
        <h2 className="font-serif text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] lg:col-span-8">
          One storyline, three projects. Each one picks up where the last left off.
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col lg:mt-24">
        {projects.map((project, i) => (
          <div key={project.slug} className="flex flex-col">
            <Chapter project={project} />
            {i < projects.length - 1 && (
              <Handoff from={project} to={projects[i + 1]} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function Chapter({ project }: { project: Project }) {
  return (
    <article id={project.slug} className="relative pt-6">
      <DrawRule className="absolute inset-x-0 top-0 h-px bg-foreground" />

      <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <div className="flex items-baseline gap-5">
          <span className="font-serif text-[clamp(4rem,9vw,7.5rem)] leading-[0.8] tracking-[-0.03em] text-signal">
            {project.index}
          </span>
          <span className="eyebrow text-foreground">{project.stage}</span>
        </div>
        <span className="eyebrow">{project.stack.join(" + ")}</span>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="flex flex-col gap-10 lg:col-span-5" delay={0.05}>
          <div className="flex flex-col gap-5">
            <h3 className="font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1] tracking-[-0.015em]">
              {project.title}
            </h3>
            <blockquote className="border-l-2 border-signal pl-4">
              <p className="eyebrow mb-2">The question</p>
              <p className="font-serif text-xl leading-snug italic">
                {project.question}
              </p>
            </blockquote>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow">What I built</p>
            <ul className="flex flex-col">
              {project.built.map((item, i) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] border-t py-2.5 text-[15px] leading-snug"
                >
                  <span className="tabular pt-0.5 font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow">Tools</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tool) => (
                <Badge key={tool} variant="outline">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              nativeButton={false}
              render={<Link href={`/projects/${project.slug}`} />}
            >
              Read the case study
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a href={project.github} target="_blank" rel="noreferrer" />
              }
            >
              <GithubLogoIcon data-icon="inline-start" />
              Project on GitHub
            </Button>
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-8 lg:col-span-7" delay={0.15}>
          <ScreenshotFrame
            shot={project.screenshots[0]}
            figure={`${project.index}.1`}
          />
          <Findings project={project} />
        </Reveal>
      </div>
    </article>
  )
}

export function Findings({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="eyebrow">{project.findingsLabel}</p>
      <dl className="grid grid-cols-1 border-t sm:grid-cols-3">
        {project.findings.map((f) => (
          <div
            key={f.label}
            className="flex flex-col gap-1 border-b py-4 sm:border-b-0 sm:px-4 sm:first:pl-0 sm:[&:not(:first-child)]:border-l"
          >
            <dt className="order-2 text-sm leading-snug text-muted-foreground">
              {f.label}
            </dt>
            <dd className="tabular order-1 font-serif text-5xl leading-none tracking-[-0.02em]">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Handoff({ from, to }: { from: Project; to: Project }) {
  return (
    <Reveal className="grid grid-cols-1 py-14 lg:grid-cols-12 lg:py-20">
      <div className="flex items-stretch gap-5 lg:col-span-7 lg:col-start-6">
        <div className="flex flex-col items-center" aria-hidden>
          <span className="w-px flex-1 bg-border" />
          <ArrowDownIcon className="my-1.5 text-signal" />
          <span className="w-px flex-1 bg-border" />
        </div>
        <div className="flex flex-col gap-1 py-2">
          <p className="eyebrow">
            Handoff · {from.index} → {to.index}
          </p>
          <p className="font-serif text-xl leading-snug">{from.output}</p>
          <p className="text-sm text-muted-foreground">
            becomes the input for {to.stage.toLowerCase()}.
          </p>
        </div>
      </div>
    </Reveal>
  )
}
