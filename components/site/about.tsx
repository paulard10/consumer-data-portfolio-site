import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { takeaways } from "@/content/projects"
import { site } from "@/content/site"

export function About() {
  return (
    <section id="about" className="container-page py-20 lg:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-6 lg:col-span-5">
          <p className="eyebrow">About this work</p>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[1] tracking-[-0.02em]">
            Learning projects, <em>honestly labelled.</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            I built these three projects independently to learn, end to end,
            how consumer data becomes something a media team can trust and act
            on. They are not client or employer work. NovaCare is a fictional
            company and every dataset is synthetic.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={site.github} target="_blank" rel="noreferrer" />}
            >
              <GithubLogoIcon data-icon="inline-start" />
              Repository
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a href={site.linkedin} target="_blank" rel="noreferrer" />
              }
            >
              <LinkedinLogoIcon data-icon="inline-start" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={`mailto:${site.email}`} />}
            >
              <EnvelopeSimpleIcon data-icon="inline-start" />
              Email
            </Button>
          </div>
        </Reveal>

        <div className="flex flex-col lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-4">Key takeaways</p>
            <ol className="flex flex-col border-t">
              {takeaways.map((t, i) => (
                <li
                  key={t.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-y-1 border-b py-5"
                >
                  <span className="tabular font-mono text-xs text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-2xl leading-tight">
                    {t.title}
                  </span>
                  <span className="col-start-2 text-[15px] leading-relaxed text-muted-foreground">
                    {t.body}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
