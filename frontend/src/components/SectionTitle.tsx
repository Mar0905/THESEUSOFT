import type { ReactNode } from "react"

export function GradientText({ children }: { children: ReactNode }) { return <span className="gradient-text">{children}</span> }

export default function SectionTitle({ eyebrow, children, description }: { eyebrow: string; children: ReactNode; description?: string }) {
  return <header className="section-title"><p>{eyebrow}</p><h2>{children}</h2>{description && <span>{description}</span>}</header>
}
