import { BrainCircuit, Layers3, Rocket, ShieldCheck, type LucideIcon } from "lucide-react"
import SectionTitle, { GradientText } from "./SectionTitle"

const values: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: BrainCircuit, title: "Inteligencia", description: "Diseñamos soluciones que aprenden y generan decisiones útiles." },
  { icon: Rocket, title: "Innovación", description: "Exploramos tecnología emergente para resolver desafíos reales." },
  { icon: Layers3, title: "Creatividad", description: "La experiencia de usuario es parte integral de nuestra ingeniería." },
  { icon: ShieldCheck, title: "Confianza", description: "Procesos transparentes y software preparado para crecer." },
]

export default function AboutSection() {
  return <section id="nosotros" className="section section--alt"><div className="container"><SectionTitle eyebrow="Nosotros">Más que software,<br/><GradientText>aliados de tu evolución.</GradientText></SectionTitle><div className="about-grid"><div><p className="lead">Somos una empresa peruana especializada en desarrollo web, automatización e inteligencia artificial.</p><p>Combinamos estrategia, diseño y tecnología para convertir retos operativos en productos digitales claros, escalables y medibles.</p><div className="stats"><b>+30 <span>proyectos</span></b><b>24/7 <span>soporte</span></b><b>99.9% <span>disponibilidad</span></b></div></div><div className="value-grid">{values.map(({ icon: Icon, title, description }) => <article key={title} className="value-card"><Icon size={24}/><h3>{title}</h3><p>{description}</p></article>)}</div></div></div></section>
}
