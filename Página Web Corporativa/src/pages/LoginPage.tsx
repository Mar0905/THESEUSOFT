import { LockKeyhole, ArrowLeft, LogIn } from "lucide-react"
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authService } from "@/services/authService"

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(""); setLoading(true)
    try { await authService.login(username, password); navigate("/") }
    catch { setError("No pudimos iniciar sesión. Verifica tus credenciales.") }
    finally { setLoading(false) }
  }
  return <main className="min-h-screen grid place-items-center px-5" style={{ background: "#0C0C10" }}>
    <section className="w-full max-w-md rounded-3xl p-8 sm:p-10" style={{ background: "#15151E", border: "1px solid rgba(124,58,237,.35)", boxShadow: "0 25px 80px rgba(0,0,0,.38)" }}>
      <Link to="/" className="inline-flex items-center gap-2 text-sm mb-10" style={{ color: "#A78BFA" }}><ArrowLeft size={16}/> Volver al sitio</Link>
      <div className="w-12 h-12 rounded-2xl grid place-items-center mb-5" style={{ background: "linear-gradient(135deg,#5B21D0,#7C3AED)" }}><LockKeyhole size={22}/></div>
      <p className="text-xs uppercase tracking-[.18em] font-semibold" style={{ color: "#A78BFA" }}>Portal THESEUSOFT</p>
      <h1 className="text-3xl font-extrabold mt-2 mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Iniciar sesión</h1>
      <p className="text-sm mb-7" style={{ color: "#9CA3AF" }}>Accede para gestionar solicitudes de soporte.</p>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm">Usuario<input required value={username} onChange={e=>setUsername(e.target.value)} className="mt-1.5 w-full rounded-xl px-4 py-3 outline-none" style={{ background: "#0C0C10", border: "1px solid rgba(124,58,237,.35)" }}/></label>
        <label className="block text-sm">Contraseña<input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1.5 w-full rounded-xl px-4 py-3 outline-none" style={{ background: "#0C0C10", border: "1px solid rgba(124,58,237,.35)" }}/></label>
        {error && <p role="alert" className="text-sm rounded-lg p-3" style={{ color: "#FCA5A5", background: "rgba(239,68,68,.12)" }}>{error}</p>}
        <button disabled={loading} className="w-full py-3 rounded-xl font-bold inline-flex justify-center gap-2 disabled:opacity-60" style={{ background: "linear-gradient(135deg,#5B21D0,#7C3AED)" }}><LogIn size={18}/>{loading ? "Ingresando..." : "Ingresar"}</button>
      </form>
    </section>
  </main>
}
