import { ArrowDown, Sparkles } from "lucide-react"

const nodes = Array.from({ length: 18 }, (_, index) => ({ x: 8 + (index % 6) * 17, y: 8 + Math.floor(index / 6) * 35 }))

export default function Hero() {
  return <section id="inicio" className="hero"><div className="network" aria-hidden="true">{nodes.map((node, index) => <i key={index} style={{ left: `${node.x}%`, top: `${node.y}%` }} />)}</div><div className="container hero-content"><div><span className="ai-badge"><Sparkles size={14}/> Tecnología con inteligencia artificial</span><h1>Construimos tecnología que <em>piensa contigo.</em></h1><p>Soluciones web inteligentes para empresas que quieren automatizar, crecer y tomar mejores decisiones.</p><div className="hero-actions"><a href="#soluciones" className="button button--primary">Explorar soluciones</a><a href="#contacto" className="button button--ghost">Hablemos de tu proyecto</a></div></div><div className="hero-orb"><span>IA</span><small>Innovación<br/>en movimiento</small></div></div><a className="hero-scroll" href="#nosotros"><ArrowDown size={18}/> Descubre más</a></section>
}
