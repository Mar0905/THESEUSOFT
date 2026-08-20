import Brand from "./Brand"

export default function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><Brand/><p>Creamos tecnología que piensa contigo. Soluciones web inteligentes para empresas que buscan transformarse.</p></div><div><b>Empresa</b><a href="#nosotros">Nosotros</a><a href="#clientes">Clientes</a></div><div><b>Soluciones</b><a href="#soluciones">Inteligencia artificial</a><a href="#soluciones">Apps web</a></div><div><b>Contacto</b><a href="#contacto">hola@theseusoft.com</a><a href="#soporte">Soporte</a></div></div><p className="footer-copy">© 2026 THESEUSOFT. Todos los derechos reservados.</p></footer>
}
