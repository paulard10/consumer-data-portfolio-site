import Image from "next/image"

import type { Screenshot } from "@/content/projects"
import { cn } from "@/lib/utils"

/** A real project screenshot in a thin, square-cornered frame with a figure caption. */
export function ScreenshotFrame({
  shot,
  figure,
  sizes = "(min-width: 1024px) 58vw, 100vw",
  priority,
  className,
}: {
  shot: Screenshot
  figure: string
  sizes?: string
  priority?: boolean
  className?: string
}) {
  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      <div className="border bg-card p-1.5 sm:p-2">
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full border"
        />
      </div>
      <figcaption className="flex justify-between gap-4 font-mono text-[11px] text-muted-foreground">
        <span>{shot.caption}</span>
        <span className="shrink-0">Fig. {figure}</span>
      </figcaption>
    </figure>
  )
}
