export type Solution = {
  name: string
  tagline: string
  description: string
  technologies: string[]
  features: string[]
  metrics: { value: string; label: string }[]
}

export type CaseStudy = {
  client: string
  sector: string
  quote: string
  result: string
  problem: string
  solution: string
}
