import { Separator } from "@/components/ui/separator"
import { disclaimer, site } from "@/content/site"

export function SiteFooter() {
  return (
    <footer className="container-page pb-10">
      <Separator />
      <div className="flex flex-col gap-3 pt-6 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="max-w-xl sm:text-right">{disclaimer}</p>
      </div>
    </footer>
  )
}
