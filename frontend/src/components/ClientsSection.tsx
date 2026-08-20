import { ChevronDown } from "lucide-react"
import { useState } from "react"
import type { CaseStudy } from "@/models/content"
import SectionTitle, { GradientText } from "./SectionTitle"

const clients = ["InkaRetail", "BancoPeru", "Salud360", "LogisTrans", "EduFutura", "Constructec", "AgriSmart", "MediCorp"]
const cases: CaseStudy[] = [
  { client: "InkaRetail", sector: "Retail · Lima", quote: "Transformó completamente nuestra atención al cliente.", result: "-40% costos operativos", problem: "Consultas fuera del horario laboral causaban abandono de carrito.", solution: "AI Customer Support integrado en web y WhatsApp." },
  { client: "LogisTrans", sector: "Logística", quote: "Ahora conocemos el estado de cada operación en tiempo real.", result: "-55% tiempo operativo", problem: "Información dispersa y procesos manuales.", solution: "Dashboard de IA y automatización de flujos." },
  { client: "Salud360", sector: "Salud", quote: "Las citas ya no se pierden y el equipo puede enfocarse en los pacientes.", result: "0% llamadas perdidas", problem: "Alto volumen de llamadas para citas.", solution: "Asistente conversacional para agenda y orientación." },
]

function CaseCard({ item }: { item: CaseStudy }) {
  const [expanded, setExpanded] = useState(false)
  return <article className="case-card"><div className="case-card__head"><b>{item.client.slice(0, 2)}</b><span><strong>{item.client}</strong><small>{item.sector}</small></span></div><blockquote>“{item.quote}”</blockquote><p className="case-result">{item.result}</p>{expanded && <div className="case-detail"><p><b>Problema:</b> {item.problem}</p><p><b>Solución:</b> {item.solution}</p></div>}<button onClick={() => setExpanded(!expanded)}>{expanded ? "Ocultar detalle" : "Ver caso completo"}<ChevronDown size={15}/></button></article>
}

export default function ClientsSection() {
  return <section id="clientes" className="section section--alt"><div className="container"><SectionTitle eyebrow="Clientes" description="Empresas de diversos sectores que ya compiten con inteligencia.">Empresas que <GradientText>confían en nosotros.</GradientText></SectionTitle><div className="client-grid">{clients.map((client) => <div className="client-logo" key={client}><b>{client.slice(0, 2)}</b>{client}</div>)}</div><h3 className="subheading">Casos de éxito</h3><div className="case-grid">{cases.map((item) => <CaseCard key={item.client} item={item}/>)}</div></div></section>
}
