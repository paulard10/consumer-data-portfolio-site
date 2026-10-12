import { About } from "@/components/site/about"
import { Capabilities } from "@/components/site/capabilities"
import { Hero } from "@/components/site/hero"
import { Journey } from "@/components/site/journey"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { disclaimer } from "@/content/site"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <div className="border-y bg-foreground text-background">
          <p className="container-page py-3 font-mono text-[11px] leading-relaxed tracking-wide">
            <span className="mr-3 text-signal-ink">●</span>
            {disclaimer}
          </p>
        </div>
        <Journey />
        <Capabilities />
        <About />
      </main>
      <SiteFooter />
    </>
  )
}
