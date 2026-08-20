import { Menu, X } from "lucide-react"
import { useState } from "react"
import Brand from "./Brand"
import { useSectionNavigation } from "@/hooks/useSectionNavigation"

const links = [
  ["Inicio", "inicio"], ["Nosotros", "nosotros"], ["Soluciones", "soluciones"],
  ["Clientes", "clientes"], ["Soporte", "soporte"], ["Contacto", "contacto"],
] as const
const sectionIds = links.map(([, id]) => id)

export default function Header() {
  const [open, setOpen] = useState(false)
  const { activeSection, isScrolled } = useSectionNavigation(sectionIds)
  const navigate = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false) }

  return <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
    <nav className="container"><Brand /><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Abrir menú">{open ? <X /> : <Menu />}</button>
      <div className={`nav-links ${open ? "nav-links--open" : ""}`}>{links.map(([label, id]) => <button key={id} className={activeSection === id ? "active" : ""} onClick={() => navigate(id)}>{label}</button>)}<a className="login-link" href="/login">Portal</a></div>
    </nav>
  </header>
}
