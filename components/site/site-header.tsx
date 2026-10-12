import Link from "next/link"
import { GithubLogoIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { site } from "@/content/site"

const nav = [
  { href: "/#journey", label: "Journey" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#about", label: "About" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/92 backdrop-saturate-150">
      <div className="container-page flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-baseline gap-3 font-mono text-xs tracking-wide"
        >
          <span className="font-medium">{site.name}</span>
          <span className="hidden text-muted-foreground sm:inline">
            / Data Portfolio
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          <ul className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="eyebrow transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<a href={site.github} target="_blank" rel="noreferrer" />}
          >
            <GithubLogoIcon data-icon="inline-start" />
            GitHub
          </Button>
        </nav>
      </div>
    </header>
  )
}
