import { MessageCircle, Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const number = "51987654321"
const quickReplies = ["Quiero conocer sus soluciones", "Necesito soporte técnico", "Solicitar una demo"]
type Message = { from: "bot" | "user"; text: string }

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: "¡Hola! Soy el asistente virtual de THESEUSOFT. ¿En qué puedo ayudarte?" }])
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { if (open) end.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, open])
  const send = (text = input) => {
    if (!text.trim()) return
    setMessages((current) => [...current, { from: "user", text }]); setInput("")
    window.setTimeout(() => setMessages((current) => [...current, { from: "bot", text: "Gracias. Un asesor te responderá en breve." }]), 700)
  }
  const openWhatsApp = () => window.open(`https://wa.me/${number}?text=${encodeURIComponent(input || "Hola, me contacto desde THESEUSOFT")}`, "_blank", "noopener,noreferrer")
  return <aside className="whatsapp"><section className={open ? "whatsapp-panel" : "hidden"}><header><strong>THESEUSOFT AI</strong><button onClick={() => setOpen(false)} aria-label="Cerrar"><X size={18} /></button></header><div className="chat">{messages.map((message, index) => <p key={index} className={message.from}>{message.text}</p>)}<div ref={end} /></div><div className="quick-replies">{quickReplies.map((reply) => <button key={reply} onClick={() => send(reply)}>{reply}</button>)}</div><div className="chat-input"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Escribe un mensaje"/><button onClick={() => input ? send() : openWhatsApp()} aria-label="Enviar"><Send size={16}/></button></div></section><button className="whatsapp-trigger" onClick={() => setOpen(!open)} aria-label="Abrir chat"><MessageCircle /></button></aside>
}
