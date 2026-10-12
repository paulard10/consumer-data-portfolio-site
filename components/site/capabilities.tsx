import { Reveal } from "@/components/site/reveal"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { projects } from "@/content/projects"

// Which project exercises which capability, as described in each project README.
const rows: { label: string; cells: [boolean, boolean, boolean] }[] = [
  { label: "Profiling & taxonomy harmonisation", cells: [true, true, false] },
  { label: "Identity & duplicate checks", cells: [true, true, false] },
  { label: "Consent & activation validation", cells: [true, true, true] },
  { label: "Readiness scoring & classification", cells: [true, true, false] },
  { label: "Threshold-based quality monitoring", cells: [false, true, true] },
  { label: "Star-schema modelling & DAX KPIs", cells: [false, false, true] },
  { label: "Business-facing recommendations", cells: [true, false, true] },
]

export function Capabilities() {
  return (
    <section id="capabilities" className="border-y bg-card/60">
      <div className="container-page grid grid-cols-1 gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <Reveal className="flex flex-col gap-5 lg:col-span-4">
          <p className="eyebrow">Capabilities</p>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[1] tracking-[-0.02em]">
            What the projects cover.
          </h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Readiness and consent checks run through the whole pipeline. Each
            project adds one layer: scoring, automation, then measurement.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.1}>
          <Table className="text-sm">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="eyebrow h-10 pl-0">Capability</TableHead>
                {projects.map((p) => (
                  <TableHead
                    key={p.slug}
                    className="eyebrow h-10 w-20 text-center sm:w-28"
                  >
                    <span className="block text-foreground">{p.index}</span>
                    <span className="hidden normal-case tracking-normal sm:block">
                      {p.stack.join(" + ")}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.label} className="hover:bg-signal-soft/40">
                  <TableCell className="py-3.5 pl-0 whitespace-normal">
                    {row.label}
                  </TableCell>
                  {row.cells.map((on, i) => (
                    <TableCell key={i} className="text-center">
                      {on ? (
                        <span
                          className="inline-block size-2.5 bg-signal"
                          aria-label="Yes"
                        />
                      ) : (
                        <span
                          className="inline-block h-px w-3 bg-border align-middle"
                          aria-label="No"
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Reveal>
      </div>
    </section>
  )
}
