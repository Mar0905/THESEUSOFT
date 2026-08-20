import { Check, X } from "lucide-react"
import { useEffect, useState } from "react"
import type { Solution } from "@/models/content"
import SectionTitle, { GradientText } from "./SectionTitle"

const solutions: Solution[] = [
  { name: "AI Business Assistant", tagline: "Tu asistente ejecutivo con IA", description: "Automatiza tareas administrativas, documentos, agendas y consultas internas.", technologies: ["GPT-4o", "React", "FastAPI"], features: ["Redacción automatizada", "Agenda inteligente", "Búsqueda semántica"], metrics: [{ value: "3h", label: "ahorradas al día" }, { value: "65%", label: "menos tareas admin" }] },
  { name: "AI Customer Support", tagline: "Atención que nunca se detiene", description: "Atención multicanal con escalamiento inteligente y análisis de sentimiento.", technologies: ["NLP", "Rasa", "WebSocket"], features: ["Agente multicanal", "Escalamiento humano", "Base de conocimiento"], metrics: [{ value: "80%", label: "consultas resueltas" }, { value: "24/7", label: "disponibilidad" }] },
  { name: "AI Analytics", tagline: "Datos convertidos en decisiones", description: "Dashboards ejecutivos y modelos predictivos para obtener insights en minutos.", technologies: ["Python", "TensorFlow", "BigQuery"], features: ["Paneles por rol", "Alertas críticas", "Proyecciones"], metrics: [{ value: "4 min", label: "reportes" }, { value: "99.3%", label: "precisión" }] },
  { name: "Smart Recruitment", tagline: "Recluta mejor, más rápido", description: "Filtra perfiles, agenda entrevistas y evalúa candidatos con IA.", technologies: ["ML", "OpenAI", "MongoDB"], features: ["Scoring de CVs", "Evaluaciones IA", "Pipeline visual"], metrics: [{ value: "12 días", label: "contratación" }, { value: "60%", label: "mejor ajuste" }] },
  { name: "Automatización Empresarial", tagline: "Procesos sin fricción", description: "Flujos inteligentes e integraciones para eliminar tareas repetitivas.", technologies: ["RPA", "n8n", "REST"], features: ["Automatización BPA", "Integración ERP", "Alertas en tiempo real"], metrics: [{ value: "3x", label: "capacidad" }, { value: "94%", label: "precisión" }] },
  { name: "Apps Web Personalizadas", tagline: "Tu visión hecha producto", description: "Aplicaciones web escalables con arquitectura cloud e IA cuando aporta valor.", technologies: ["React", "Node.js", "AWS"], features: ["UX a medida", "Cloud-native", "APIs e integraciones"], metrics: [{ value: "6 sem.", label: "MVP listo" }, { value: "99.9%", label: "uptime" }] },
]

function SolutionModal({ solution, close }: { solution: Solution; close: () => void }) {
  useEffect(() => { const onKey = (event: KeyboardEvent) => event.key === "Escape" && close(); document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey) }, [close])
  return <div className="modal-backdrop" onMouseDown={close}><article className="solution-modal" onMouseDown={(event) => event.stopPropagation()}><button className="close" onClick={close} aria-label="Cerrar"><X/></button><span className="ai-badge">Impulsado por IA</span><h2>{solution.name}</h2><p>{solution.tagline}</p><p className="modal-description">{solution.description}</p><div className="metrics">{solution.metrics.map((metric) => <div key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>)}</div><h3>Incluye</h3>{solution.features.map((feature) => <p className="feature" key={feature}><Check size={16}/>{feature}</p>)}<a href="#contacto" className="button button--primary" onClick={close}>Solicitar una demo</a></article></div>
}

export default function SolutionsSection() {
  const [selected, setSelected] = useState<Solution | null>(null)
  return <section id="soluciones" className="section"><div className="container"><SectionTitle eyebrow="Línea de negocio" description="Tecnología diseñada para crear impacto medible.">Soluciones que <GradientText>impulsan tu negocio.</GradientText></SectionTitle><div className="solution-grid">{solutions.map((solution, index) => <article className="solution-card" key={solution.name}><span>0{index + 1}</span><h3>{solution.name}</h3><strong>{solution.tagline}</strong><p>{solution.description}</p><div>{solution.technologies.map((technology) => <small key={technology}>{technology}</small>)}</div><button onClick={() => setSelected(solution)}>Ver solución →</button></article>)}</div></div>{selected && <SolutionModal solution={selected} close={() => setSelected(null)}/>}</section>
}
