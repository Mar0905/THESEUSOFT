import { ArrowLeft, LockKeyhole, LogIn } from "lucide-react"
import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authService } from "@/services/authService"
import { getApiErrorMessage } from "@/utils/getApiErrorMessage"

export default function LoginPage() {
  const navigate = useNavigate(); const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false)
  const submit = async (event: FormEvent) => { event.preventDefault(); setLoading(true); setError(""); try { await authService.login({ username, password }); navigate("/") } catch (requestError) { setError(getApiErrorMessage(requestError, "No pudimos iniciar sesión. Verifica tus credenciales.")) } finally { setLoading(false) } }
  return <main className="login-page"><form className="login-card" onSubmit={submit}><Link to="/" className="back-link"><ArrowLeft size={16}/> Volver al sitio</Link><LockKeyhole className="login-icon"/><p className="eyebrow">Portal THESEUSOFT</p><h1>Iniciar sesión</h1><p>Accede para gestionar solicitudes de soporte.</p><label>Usuario<input required value={username} onChange={(event) => setUsername(event.target.value)}/></label><label>Contraseña<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)}/></label>{error && <p className="form-error">{error}</p>}<button className="button button--primary" disabled={loading}>{loading ? "Ingresando..." : "Ingresar"}<LogIn size={16}/></button></form></main>
}
