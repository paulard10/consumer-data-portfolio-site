import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubLogoIcon,
  InfoIcon,
} from "@phosphor-icons/react/ssr"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Findings } from "@/components/site/journey"
import { ScreenshotFrame } from "@/components/site/project-preview"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import {
  getNeighbours,
  getProject,
  projects,
  type DataTable,
} from "@/content/projects"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.title, description: project.summary }
}

export default async function CaseStudyPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) notFound()

  const { caseStudy: cs } = project
  const { prev, next } = getNeighbours(project.slug)
  const [lead, ...gallery] = project.screenshots

  const sections: { title: string; body: React.ReactNode }[] = [
    { title: "Business problem", body: <Prose>{cs.problem}</Prose> },
    { title: "Data", body: <Prose>{cs.data}</Prose> },
    { title: "Approach", body: <Steps steps={cs.approach} /> },
  ]
  if (cs.table) {
    sections.push({
      title: "Results",
      body: (
        <div className="flex flex-col gap-6">
          <ResultsTable table={cs.table} />
          {cs.note && (
            <Alert>
              <InfoIcon />
              <AlertTitle>{cs.note.title}</AlertTitle>
              <AlertDescription>{cs.note.body}</AlertDescription>
            </Alert>
          )}
        </div>
      ),
    })
  }
  sections.push({
    title: "Key findings",
    body: (
      <div className="flex flex-col gap-8">
        <Findings project={project} />
        <List items={cs.insights} />
      </div>
    ),
  })
  if (gallery.length > 0) {
    sections.push({
      title: "Screenshots",
      body: (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {gallery.map((shot, i) => (
            <ScreenshotFrame
              key={shot.src}
              shot={shot}
              figure={`${project.index}.${i + 2}`}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      ),
    })
  }
  if (cs.recommendations) {
    sections.push({
      title: "Recommendations",
      body: <List items={cs.recommendations} numbered />,
    })
  }
  sections.push(
    { title: "What I learned", body: <List items={cs.learned} /> },
    { title: "Next steps", body: <List items={cs.next} /> }
  )

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden border-b">
          <div aria-hidden className="grid-paper absolute inset-0 -z-10" />
          <div className="container-page pt-8 pb-14 lg:pb-20">
            <Reveal className="flex items-center justify-between gap-4 border-b pb-4">
              <Link
                href={`/#${project.slug}`}
                className="eyebrow flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <ArrowLeftIcon />
                All projects
              </Link>
              <span className="eyebrow">
                Case study {project.index} / 0{projects.length}
              </span>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-12">
              <Reveal className="flex flex-col gap-6 lg:col-span-8">
                <p className="eyebrow flex items-center gap-3 text-foreground">
                  <span className="font-serif text-4xl tracking-normal text-signal normal-case">
                    {project.index}
                  </span>
                  {project.stage}
                </p>
                <h1 className="font-serif text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.95] tracking-[-0.025em]">
                  {project.title}
                </h1>
                <p className="max-w-2xl font-serif text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-muted-foreground italic">
                  {project.question}
                </p>
              </Reveal>

              <Reveal delay={0.1} className="lg:col-span-4">
                <dl className="grid grid-cols-[6.5rem_1fr] border-t text-sm">
                  <Fact term="Type">Independent learning project</Fact>
                  <Fact term="Company">NovaCare (fictional)</Fact>
                  <Fact term="Data">Synthetic only</Fact>
                  <Fact term="Tools">
                    <span className="flex flex-wrap gap-1">
                      {project.tools.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </span>
                  </Fact>
                  <Fact term="On GitHub">
                    <span className="flex flex-col gap-1">
                      {project.repoLinks.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                        >
                          {l.label}
                          <ArrowUpRightIcon className="size-3" />
                        </a>
                      ))}
                    </span>
                  </Fact>
                </dl>
              </Reveal>
            </div>

            {lead && (
              <Reveal delay={0.15} className="mt-14 lg:mt-20">
                <ScreenshotFrame
                  shot={lead}
                  figure={`${project.index}.1`}
                  sizes="(min-width: 1320px) 1240px, 100vw"
                  priority
                />
              </Reveal>
            )}
          </div>
        </section>

        <div className="container-page flex flex-col py-14 lg:py-20">
          {sections.map((s, i) => (
            <section
              key={s.title}
              className="grid grid-cols-1 gap-6 border-b py-10 last:border-b-0 lg:grid-cols-12 lg:gap-10 lg:py-14"
            >
              <Reveal className="lg:col-span-3">
                <h2 className="eyebrow flex gap-3 lg:sticky lg:top-24">
                  <span className="tabular text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground">{s.title}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.05} className="lg:col-span-8 lg:col-start-5">
                {s.body}
              </Reveal>
            </section>
          ))}
        </div>

        <div className="container-page pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border bg-card p-5 sm:p-6">
            <p className="max-w-xl text-sm text-muted-foreground">
              The SQL, Python, Excel and Power BI files, data and full write-up
              are in the project folder.
            </p>
            <Button
              nativeButton={false}
              render={
                <a href={project.github} target="_blank" rel="noreferrer" />
              }
            >
              <GithubLogoIcon data-icon="inline-start" />
              Open project on GitHub
            </Button>
          </div>
        </div>

        <nav
          aria-label="Other case studies"
          className="container-page grid grid-cols-1 gap-3 py-14 sm:grid-cols-2"
        >
          <NeighbourLink project={prev} direction="prev" />
          <NeighbourLink project={next} direction="next" />
        </nav>
      </main>
      <SiteFooter />
    </>
  )
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="eyebrow border-b py-3">{term}</dt>
      <dd className="border-b py-3">{children}</dd>
    </>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-3xl font-serif text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.3] tracking-[-0.005em]">
      {children}
    </p>
  )
}

function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid grid-cols-1 border-t sm:grid-cols-2">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="flex flex-col gap-2 border-b py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
        >
          <span className="tabular font-mono text-[11px] text-signal">
            Step {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-serif text-2xl leading-tight">
            {step.title}
          </span>
          <span className="text-[15px] leading-relaxed text-muted-foreground">
            {step.body}
          </span>
        </li>
      ))}
    </ol>
  )
}

function List({ items, numbered }: { items: string[]; numbered?: boolean }) {
  return (
    <ul className="flex flex-col border-t">
      {items.map((item, i) => (
        <li
          key={item}
          className="grid grid-cols-[2rem_1fr] border-b py-3.5 text-[15px] leading-relaxed"
        >
          <span
            className={cn(
              "tabular pt-1 font-mono text-[11px]",
              numbered ? "text-signal" : "text-muted-foreground"
            )}
          >
            {numbered ? String(i + 1).padStart(2, "0") : "—"}
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

const statusTone: Record<string, string> = {
  OK: "text-signal",
  WARNING: "text-warn",
  CRITICAL: "text-destructive",
}

function ResultsTable({ table }: { table: DataTable }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] text-sm">
        <caption className="eyebrow mb-3 text-left">{table.caption}</caption>
        <thead>
          <tr className="border-y">
            {table.columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={cn(
                  "eyebrow py-2.5 font-medium",
                  i === 0 ? "text-left" : "text-right"
                )}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]} className="border-b border-dashed">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={cn(
                    "py-2.5",
                    i === 0
                      ? "pr-4 text-left"
                      : "tabular text-right font-mono text-[13px]",
                    statusTone[cell]
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {table.total && (
          <tfoot>
            <tr className="border-y border-foreground">
              {table.total.map((cell, i) => (
                <td
                  key={i}
                  className={cn(
                    "py-3 font-medium",
                    i === 0
                      ? "text-left"
                      : "tabular text-right font-mono text-[13px]",
                    statusTone[cell]
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}

function NeighbourLink({
  project,
  direction,
}: {
  project?: { slug: string; index: string; title: string }
  direction: "prev" | "next"
}) {
  if (!project) {
    return direction === "next" ? (
      <Link
        href="/#journey"
        className="group flex flex-col gap-2 border p-6 transition-colors hover:bg-card sm:text-right"
      >
        <span className="eyebrow flex items-center gap-2 sm:justify-end">
          Back to the journey <ArrowRightIcon />
        </span>
        <span className="font-serif text-2xl leading-tight transition-colors group-hover:text-signal">
          All three projects
        </span>
      </Link>
    ) : (
      <Link
        href="/"
        className="group flex flex-col gap-2 border p-6 transition-colors hover:bg-card"
      >
        <span className="eyebrow flex items-center gap-2">
          <ArrowLeftIcon /> Home
        </span>
        <span className="font-serif text-2xl leading-tight transition-colors group-hover:text-signal">
          Consumer Data Readiness
        </span>
      </Link>
    )
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col gap-2 border p-6 transition-colors hover:bg-card",
        direction === "next" && "sm:text-right"
      )}
    >
      <span
        className={cn(
          "eyebrow flex items-center gap-2",
          direction === "next" && "sm:justify-end"
        )}
      >
        {direction === "prev" && <ArrowLeftIcon />}
        {direction === "prev" ? "Previous" : "Next"} · {project.index}
        {direction === "next" && <ArrowRightIcon />}
      </span>
      <span className="font-serif text-2xl leading-tight transition-colors group-hover:text-signal">
        {project.title}
      </span>
    </Link>
  )
}
