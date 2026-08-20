import { useState, useEffect, useRef } from 'react'
import logoImg from '@/imports/image.png'
import { publicService } from '@/services/publicService'
import { useNavigationSections } from '@/hooks/useNavigationSections'

// ─── WhatsApp Chat Widget ─────────────────────────────────────────────────────

const WA_NUMBER = '51987654321' // reemplazar con número real
const WA_QUICK_REPLIES = [
  '👋 Quiero conocer sus soluciones',
  '💬 Necesito soporte técnico',
  '📊 Solicitar una demo',
  '💰 Consultar precios',
]

function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: '¡Hola! 👋 Soy el asistente virtual de *THESEUSOFT*. ¿En qué puedo ayudarte hoy?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [pulse, setPulse] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 4000)
    return () => clearTimeout(t)
  }, [])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '¡Gracias por tu mensaje! Un asesor de THESEUSOFT te responderá en breve. También puedes continuar la conversación directamente en WhatsApp. 🚀' },
      ])
    }, 1200)
  }

  const openWhatsApp = (msg?: string) => {
    const text = encodeURIComponent(msg ?? input.trim() ?? '¡Hola! Me contacto desde el sitio web de THESEUSOFT.')
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
  }

  const formatText = (text: string): React.ReactNode[] => {
    const parts = text.split(/\*(.*?)\*/)
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
    )
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip bubble */}
        {!open && pulse && (
          <div
            className="px-4 py-2.5 rounded-2xl rounded-br-sm text-sm font-medium max-w-xs animate-bounce"
            style={{ background: '#fff', color: '#111', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', fontFamily: 'Inter, sans-serif' }}
          >
            💬 ¿Necesitas ayuda? ¡Chatea con nosotros!
          </div>
        )}

        <button
          onClick={() => { setOpen(!open); setPulse(false) }}
          className="w-15 h-15 rounded-full flex items-center justify-center transition-all duration-300 relative"
          style={{
            width: 60, height: 60,
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            boxShadow: open ? '0 0 0 4px rgba(37,211,102,0.25)' : '0 4px 24px rgba(37,211,102,0.5)',
            transform: open ? 'rotate(0deg) scale(0.95)' : 'scale(1)',
          }}
          aria-label="Abrir chat de WhatsApp"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          )}
          {/* Notification dot */}
          {!open && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#EF4444', color: '#fff', fontSize: 10 }}>1</span>
          )}
        </button>
      </div>

      {/* Chat window */}
      <div
        className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[360px] rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
        style={{
          maxHeight: open ? '520px' : '0',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          transformOrigin: 'bottom right',
          border: '1px solid rgba(37,211,102,0.25)',
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #075E54, #128C7E)' }}>
          <div className="relative shrink-0">
            <img src={logoImg} alt="THESEUSOFT" className="w-10 h-10 rounded-full object-contain p-1" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#075E54]" style={{ background: '#25D366' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>THESEUSOFT</p>
            <p className="text-xs" style={{ color: '#A7F3D0' }}>● En línea · Responde en minutos</p>
          </div>
          <button onClick={() => openWhatsApp()} className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
            Abrir WA
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ background: '#ECE5DD', maxHeight: 280 }}>
          <div className="text-center">
            <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.12)', color: '#6B6B6B', fontFamily: 'Inter, sans-serif' }}>Hoy</span>
          </div>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: msg.from === 'user' ? '#DCF8C6' : '#fff',
                  color: '#111',
                  fontFamily: 'Inter, sans-serif',
                  borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {formatText(msg.text)}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center" style={{ background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                {[0, 150, 300].map((d) => (
                  <span key={d} className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#9CA3AF', animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="px-3 py-2 flex gap-2 overflow-x-auto" style={{ background: '#F0F0F0', scrollbarWidth: 'none' }}>
          {WA_QUICK_REPLIES.map((r) => (
            <button
              key={r}
              onClick={() => openWhatsApp(r)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap"
              style={{ background: '#fff', border: '1px solid rgba(37,211,102,0.5)', color: '#075E54', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#DCF8C6' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fff' }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 py-2.5 flex items-center gap-2" style={{ background: '#F0F0F0' }}>
          <input
            className="flex-1 px-4 py-2 rounded-full text-sm outline-none"
            style={{ background: '#fff', color: '#111', fontFamily: 'Inter, sans-serif', border: 'none' }}
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          />
          <button
            onClick={() => input.trim() ? sendMessage(input) : openWhatsApp()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: input.trim() ? '#25D366' : '#128C7E', flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Footer note */}
        <div className="py-2 text-center text-xs" style={{ background: '#F0F0F0', color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>
          Powered by <span style={{ color: '#7C3AED', fontWeight: 600 }}>THESEUSOFT AI</span>
        </div>
      </div>
    </>
  )
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function GradientText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 50%, #5B21D0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
    >
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="block w-6 h-px" style={{ background: '#7C3AED' }} />
      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#A78BFA', fontFamily: 'Inter, sans-serif' }}>{children}</span>
      <span className="block w-6 h-px" style={{ background: '#7C3AED' }} />
    </div>
  )
}

function AIBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: 'rgba(91,33,208,0.25)', border: '1px solid rgba(124,58,237,0.5)', color: '#A78BFA' }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#A78BFA' }} />
      Impulsado por IA
    </span>
  )
}

// ─── Neural Network SVG (Hero decoration) ────────────────────────────────────

function NeuralNetwork() {
  const nodes = [
    { cx: 120, cy: 80 }, { cx: 260, cy: 50 }, { cx: 400, cy: 90 }, { cx: 520, cy: 60 },
    { cx: 60, cy: 200 }, { cx: 190, cy: 180 }, { cx: 340, cy: 210 }, { cx: 470, cy: 170 }, { cx: 580, cy: 200 },
    { cx: 100, cy: 320 }, { cx: 240, cy: 300 }, { cx: 390, cy: 340 }, { cx: 530, cy: 310 },
    { cx: 160, cy: 430 }, { cx: 310, cy: 460 }, { cx: 450, cy: 420 }, { cx: 570, cy: 450 },
  ]
  const edges = [
    [0,1],[1,2],[2,3],[0,4],[1,5],[2,6],[3,7],[4,5],[5,6],[6,7],[7,8],
    [4,9],[5,10],[6,11],[7,12],[9,10],[10,11],[11,12],[9,13],[10,14],[11,15],[12,16],[13,14],[14,15],[15,16],
    [1,6],[2,7],[5,11],[6,12],[10,15],
  ]
  return (
    <svg viewBox="0 0 640 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ opacity: 0.55 }}>
      <defs>
        <radialGradient id="ng1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5B21D0" stopOpacity="0.4" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="url(#ng1)" strokeWidth="0.8" strokeOpacity="0.5"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx} cy={n.cy} r={i % 3 === 0 ? 6 : 4}
          fill={i % 5 === 0 ? '#A78BFA' : '#7C3AED'}
          filter="url(#glow)"
        />
      ))}
    </svg>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Línea de Negocio', href: '#linea' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Ticket de Soporte', href: '#soporte' },
  { label: 'Contáctanos', href: '#contacto' },
]
const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1))

function Navbar() {
  const [open, setOpen] = useState(false)
  const { active, scrolled } = useNavigationSections(NAV_SECTION_IDS)

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(12,12,16,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(91,33,208,0.2)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" onClick={(e) => scrollTo(e, '#inicio')} className="flex items-center gap-2.5 shrink-0">
          <span className="flex items-center gap-2.5">
            <span
              className="flex items-center justify-center shrink-0"
              style={{ width: 36, height: 36, borderRadius: 800, background: 'linear-gradient(135deg, #5B21D0, #7C3AED)', borderStyle: 'none', borderColor: 'rgba(0,0,0,0)' }}
            >
              <svg width="22" height="22" viewBox="0 0 64 64" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 6C32 6 20 10 16 20C12 30 18 36 18 36C18 36 12 34 8 38C4 42 6 50 6 50C6 50 12 44 20 46C28 48 30 54 32 58C34 54 36 48 44 46C52 44 58 50 58 50C58 50 60 42 56 38C52 34 46 36 46 36C46 36 52 30 48 20C44 10 32 6 32 6Z" opacity="0.9"/>
                <path d="M32 14C32 14 24 18 22 26C20 32 24 36 24 36C24 36 20 35 18 38C16 40 17 44 17 44C17 44 21 40 26 42C29 43.5 30 47 32 50C34 47 35 43.5 38 42C43 40 47 44 47 44C47 44 48 40 46 38C44 35 40 36 40 36C40 36 44 32 42 26C40 18 32 14 32 14Z"/>
                <circle cx="32" cy="30" r="5" opacity="0.8"/>
              </svg>
            </span>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '-0.03em', lineHeight: 1 }}>
              <span style={{ color: '#F5F5F7' }}>THESEU</span><span style={{ color: '#7C3AED' }}>SOFT</span>
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative"
                  style={{
                    color: isActive ? '#fff' : '#C4B5FD',
                    background: isActive ? 'rgba(91,33,208,0.2)' : 'transparent',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(91,33,208,0.12)' } }}
                  onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLAnchorElement).style.color = '#C4B5FD'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' } }}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: '#7C3AED' }} />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#linea"
            onClick={(e) => scrollTo(e, '#linea')}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #5B21D0, #7C3AED)', color: '#fff', fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
          >
            Conoce nuestras soluciones
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg"
          onClick={() => setOpen(!open)}
          style={{ background: 'rgba(91,33,208,0.15)' }}
          aria-label="Menú"
        >
          <span className={`block w-5 h-0.5 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ background: '#A78BFA' }} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} style={{ background: '#A78BFA' }} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: '#A78BFA' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '500px' : '0', background: 'rgba(12,12,16,0.97)', borderBottom: open ? '1px solid rgba(91,33,208,0.2)' : 'none' }}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  color: isActive ? '#E9D5FF' : '#C4B5FD',
                  background: isActive ? 'rgba(91,33,208,0.2)' : 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  borderLeft: isActive ? '2px solid #7C3AED' : '2px solid transparent',
                }}
              >
                {item.label}
              </a>
            )
          })}
          <a
            href="#linea"
            onClick={(e) => scrollTo(e, '#linea')}
            className="mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-center"
            style={{ background: 'linear-gradient(135deg, #5B21D0, #7C3AED)', color: '#fff' }}
          >
            Conoce nuestras soluciones
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(91,33,208,0.22) 0%, #0C0C10 60%)' }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(91,33,208,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,33,208,0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Neural network bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-3xl h-[520px] opacity-40">
          <NeuralNetwork />
        </div>
      </div>

      {/* Purple glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,33,208,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{ background: 'rgba(91,33,208,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#A78BFA' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#A78BFA' }} />
          Startup de Inteligencia Artificial · 2026
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6"
          style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}
        >
          Creamos tecnología<br />
          <GradientText>que piensa contigo</GradientText>
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#9CA3AF' }}>
          THESEUSOFT desarrolla un ecosistema de aplicaciones web inteligentes impulsadas por IA, diseñadas para automatizar procesos, analizar datos y transformar la toma de decisiones empresariales.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#linea"
            onClick={(e) => { e.preventDefault(); const el = document.getElementById('linea'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' }) }}
            className="px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #5B21D0, #7C3AED)', color: '#fff', boxShadow: '0 0 32px rgba(91,33,208,0.4)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 48px rgba(91,33,208,0.6)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(91,33,208,0.4)' }}
          >
            Conoce nuestras soluciones
          </a>
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); const el = document.getElementById('contacto'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' }) }}
            className="px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(124,58,237,0.5)', color: '#E2D9F3' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(91,33,208,0.15)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#7C3AED' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,58,237,0.5)' }}
          >
            Habla con nosotros
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: '+10', label: 'Soluciones digitales' },
            { value: 'IA', label: 'Aplicada a negocios' },
            { value: '100%', label: 'Web-first & Cloud' },
            { value: '24/7', label: 'Soporte técnico' },
          ].map((stat) => (
            <div
              key={stat.value}
              className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(91,33,208,0.25)', backdropFilter: 'blur(8px)' }}
            >
              <div className="text-2xl font-extrabold mb-1" style={{ fontFamily: 'Manrope, sans-serif', color: '#A78BFA' }}>{stat.value}</div>
              <div className="text-xs" style={{ color: '#6B7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Nosotros ─────────────────────────────────────────────────────────────────

const VALORES = [
  { title: 'Innovación', desc: 'Exploramos tecnologías emergentes para crear soluciones que marcan tendencia.' },
  { title: 'Inteligencia', desc: 'Cada solución es diseñada con datos, razonamiento y aprendizaje automático.' },
  { title: 'Creatividad', desc: 'El diseño y la experiencia de usuario son parte integral de nuestra ingeniería.' },
  { title: 'Transparencia', desc: 'Construimos confianza con comunicación clara y procesos abiertos.' },
  { title: 'Excelencia', desc: 'Aplicamos los más altos estándares de calidad en cada línea de código.' },
  { title: 'Impacto', desc: 'Medimos el éxito en el impacto real que generamos en los negocios de nuestros clientes.' },
]

const CERTS = [
  'ISO 27001 — Seguridad de la información',
  'Google Cloud Partner',
  'Microsoft AI Partner',
  'AWS Startup Program',
  'Startup Reconocida · 2025',
  'Certificación en IA Ética',
]

function Nosotros() {
  return (
    <section id="nosotros" className="py-24 relative" style={{ background: '#0C0C10' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-16">
          <SectionLabel>Nosotros</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-extrabold" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Quiénes somos
          </h2>
        </div>

        {/* Quiénes somos / Misión / Visión */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: 'Quiénes somos',
              text: 'THESEUSOFT es una startup tecnológica fundada con la misión de poner la Inteligencia Artificial al alcance de las empresas. Nació de un equipo apasionado por construir software que piensa, aprende y genera valor real desde el primer día.'
            },
            {
              title: 'Nuestra misión',
              text: 'Desarrollar soluciones digitales inteligentes que optimicen procesos empresariales mediante Inteligencia Artificial, reduciendo costos operativos y habilitando decisiones más rápidas y precisas para nuestros clientes.'
            },
            {
              title: 'Nuestra visión',
              text: 'Ser la startup de referencia en aplicaciones web impulsadas por IA en Latinoamérica, creando un ecosistema de productos que democratizan el acceso a la inteligencia artificial empresarial.'
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl p-7 transition-all duration-300 group"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,33,208,0.2)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(124,58,237,0.6)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(91,33,208,0.07)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(91,33,208,0.2)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)' }}
            >
              <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#A78BFA' }}>{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{card.text}</p>
            </div>
          ))}
        </div>

        {/* Certificaciones */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>Certificaciones y reconocimientos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CERTS.map((cert) => (
              <div
                key={cert}
                className="rounded-xl p-4 text-center text-xs font-medium leading-tight transition-all duration-200"
                style={{ background: 'rgba(91,33,208,0.1)', border: '1px solid rgba(91,33,208,0.25)', color: '#C4B5FD' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(91,33,208,0.2)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(91,33,208,0.1)' }}
              >
                {cert}
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-3" style={{ color: '#6B7280' }}>* Certificaciones y reconocimientos placeholder — actualizar con acreditaciones oficiales</p>
        </div>

        {/* Valores */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>Nuestros valores</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALORES.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 rounded-2xl p-6 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,33,208,0.15)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(91,33,208,0.08)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(124,58,237,0.4)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(91,33,208,0.15)' }}
              >
                <div>
                  <h4 className="font-bold mb-1" style={{ fontFamily: 'Manrope, sans-serif', color: '#E9D5FF' }}>{v.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Línea de Negocio ─────────────────────────────────────────────────────────

type Solucion = {
  name: string
  tagline: string
  desc: string
  tech: string[]
  caracteristicas: string[]
  beneficios: { valor: string; label: string }[]
  casos: string
  ideal: string
}

const SOLUCIONES: Solucion[] = [
  {
    name: 'AI Business Assistant',
    tagline: 'Tu asistente ejecutivo con inteligencia artificial',
    desc: 'Asistente inteligente que automatiza tareas administrativas, gestiona agendas, redacta documentos y responde consultas internas usando procesamiento de lenguaje natural.',
    tech: ['GPT-4o', 'LangChain', 'React', 'FastAPI'],
    caracteristicas: [
      'Redaccion automatica de correos, informes y propuestas',
      'Gestion de agendas y recordatorios inteligentes',
      'Busqueda semantica en documentos y base de conocimiento',
      'Integracion con Gmail, Outlook, Slack y Teams',
      'Historial de conversaciones y contexto persistente',
      'Panel de administracion con estadisticas de uso',
    ],
    beneficios: [
      { valor: '3h', label: 'Ahorradas por empleado / dia' },
      { valor: '65%', label: 'Menos tiempo en tareas admin' },
      { valor: '99%', label: 'Disponibilidad 24/7' },
    ],
    casos: 'Empresas con equipos administrativos grandes, consultoras, estudios legales, agencias y startups en crecimiento que quieren escalar sin aumentar headcount.',
    ideal: 'Equipos de 10 a 500 personas con alta carga de trabajo administrativo y comunicacion interna.',
  },
  {
    name: 'AI Customer Support',
    tagline: 'Atencion al cliente sin limites de horario ni escala',
    desc: 'Plataforma de atencion al cliente potenciada por IA que resuelve el 80% de consultas sin intervencion humana, con escalamiento inteligente y analisis de sentimiento.',
    tech: ['NLP', 'Rasa', 'WebSocket', 'Postgres'],
    caracteristicas: [
      'Agente conversacional multicanal: web, WhatsApp, Messenger',
      'Escalamiento automatico a agente humano para casos criticos',
      'Analisis de sentimiento y deteccion de clientes frustrados',
      'Base de conocimiento con aprendizaje continuo',
      'Dashboard en tiempo real de tickets y satisfaccion',
      'Integracion con CRMs: HubSpot, Salesforce, Zoho',
    ],
    beneficios: [
      { valor: '80%', label: 'Consultas resueltas sin humano' },
      { valor: '78%', label: 'Menos tiempo de respuesta' },
      { valor: '24/7', label: 'Atencion ininterrumpida' },
    ],
    casos: 'Retailers, empresas de servicios, fintechs, clinicas y cualquier negocio con alto volumen de consultas repetitivas y necesidad de atencion fuera de horario.',
    ideal: 'Empresas con mas de 200 consultas diarias o que pierden clientes por tiempos de espera.',
  },
  {
    name: 'AI Analytics',
    tagline: 'Datos que se convierten en decisiones en minutos',
    desc: 'Dashboard de inteligencia de negocio con modelos predictivos integrados. Transforma datos brutos en insights accionables con visualizaciones en tiempo real.',
    tech: ['Python', 'TensorFlow', 'D3.js', 'BigQuery'],
    caracteristicas: [
      'Dashboards ejecutivos personalizados por rol',
      'Modelos predictivos de ventas, demanda y riesgo',
      'Alertas automaticas ante anomalias criticas',
      'Conexion a multiples fuentes: ERP, CRM, hojas de calculo',
      'Reportes programados en PDF o email',
      'Comparativas historicas y proyecciones a 90 dias',
    ],
    beneficios: [
      { valor: '4 min', label: 'Generacion de reportes' },
      { valor: '99.3%', label: 'Precision de datos' },
      { valor: '-70%', label: 'Horas de analisis manual' },
    ],
    casos: 'Gerencias comerciales, equipos financieros, operaciones y supply chain que necesitan visibilidad en tiempo real para tomar decisiones estrategicas.',
    ideal: 'Organizaciones con datos dispersos en multiples sistemas y decisiones lentas por falta de visibilidad.',
  },
  {
    name: 'Smart Recruitment',
    tagline: 'Recluta mejor en menos tiempo con IA',
    desc: 'Sistema de reclutamiento inteligente que filtra curriculos, evalua candidatos, agenda entrevistas automaticamente y predice el fit cultural usando IA.',
    tech: ['ML', 'OpenAI', 'Next.js', 'MongoDB'],
    caracteristicas: [
      'Parsing y scoring automatico de CVs por perfil requerido',
      'Evaluaciones tecnicas y situacionales con IA',
      'Agenda de entrevistas sin fricciones para candidatos',
      'Prediccion de fit cultural y permanencia a largo plazo',
      'Pipeline visual tipo kanban por posicion',
      'Integracion con LinkedIn, Computrabajo y portales locales',
    ],
    beneficios: [
      { valor: '12 dias', label: 'Tiempo de contratacion' },
      { valor: '60%', label: 'Mejor calidad de candidatos' },
      { valor: '22%', label: 'Menos rotacion temprana' },
    ],
    casos: 'Empresas con contratacion frecuente: retail, construccion, manufactura, BPO, hospitales y cualquier organizacion con equipos de RRHH desbordados.',
    ideal: 'Empresas que contratan mas de 20 personas al mes o que tienen alta rotacion de personal.',
  },
  {
    name: 'Automatizacion Empresarial',
    tagline: 'Libera a tu equipo de tareas repetitivas',
    desc: 'Suite de automatizacion de procesos de negocio (BPA) con flujos de trabajo inteligentes, integracion con ERPs y monitoreo en tiempo real de operaciones criticas.',
    tech: ['RPA', 'n8n', 'Zapier-API', 'REST'],
    caracteristicas: [
      'Mapeo y automatizacion de procesos criticos del negocio',
      'Robots RPA para tareas en sistemas legacy sin API',
      'Integracion con SAP, Oracle, SUNAT y sistemas locales',
      'Monitor de ejecucion con alertas de fallos en tiempo real',
      'Flujos de aprobacion y notificaciones automaticas',
      'Reduccion de errores humanos en procesos repetitivos',
    ],
    beneficios: [
      { valor: '3x', label: 'Capacidad operativa' },
      { valor: '94%', label: 'Precision en procesos' },
      { valor: '-65%', label: 'Tiempo en tareas repetitivas' },
    ],
    casos: 'Logistica, manufactura, sector financiero, sector publico y cualquier empresa con procesos manuales que generan cuellos de botella o errores frecuentes.',
    ideal: 'Organizaciones con procesos que se repiten mas de 100 veces al mes y consumen tiempo de personal calificado.',
  },
  {
    name: 'Apps Web Personalizadas',
    tagline: 'Tu vision hecha realidad con tecnologia de punta',
    desc: 'Desarrollo a medida de aplicaciones web empresariales con componentes de IA integrados, arquitectura escalable en la nube y soporte continuo post-lanzamiento.',
    tech: ['React', 'Node.js', 'AWS', 'Tailwind'],
    caracteristicas: [
      'Diseno UX/UI centrado en el usuario y tus objetivos',
      'Arquitectura cloud-native escalable desde el inicio',
      'Modulos de IA integrados segun la necesidad',
      'APIs REST y webhooks para integracion con sistemas existentes',
      'Plan de soporte, mantenimiento y mejora continua',
      'Entrega iterativa con sprints de 2 semanas',
    ],
    beneficios: [
      { valor: '6 sem.', label: 'MVP funcional listo' },
      { valor: '99.9%', label: 'Uptime garantizado' },
      { valor: '100%', label: 'A medida de tu negocio' },
    ],
    casos: 'Startups con idea validada, empresas que quieren digitalizar procesos internos, portales de clientes, plataformas de servicio o cualquier producto digital nuevo.',
    ideal: 'Empresas que no encuentran un software estandar que se adapte a sus procesos o que quieren un producto propio.',
  },
]

function SolucionModal({ sol, onClose }: { sol: Solucion; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: '#131320', border: '1px solid rgba(124,58,237,0.4)', boxShadow: '0 0 80px rgba(91,33,208,0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 px-7 py-5 flex items-start justify-between gap-4" style={{ background: 'linear-gradient(135deg,rgba(91,33,208,0.35),rgba(124,58,237,0.15))', borderBottom: '1px solid rgba(91,33,208,0.25)' }}>
          <div>
            <div className="mb-2"><AIBadge /></div>
            <h2 className="text-2xl font-extrabold" style={{ fontFamily: 'Manrope,sans-serif', color: '#F5F5F7' }}>{sol.name}</h2>
            <p className="text-sm mt-1" style={{ color: '#A78BFA' }}>{sol.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#9CA3AF' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#9CA3AF' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="px-7 py-6 flex flex-col gap-7">
          {/* Descripcion */}
          <p className="text-sm leading-relaxed" style={{ color: '#D1D5DB' }}>{sol.desc}</p>

          {/* Metricas */}
          <div className="grid grid-cols-3 gap-3">
            {sol.beneficios.map((b) => (
              <div key={b.label} className="rounded-xl p-4 text-center" style={{ background: 'rgba(91,33,208,0.15)', border: '1px solid rgba(91,33,208,0.3)' }}>
                <p className="text-xl font-extrabold" style={{ fontFamily: 'Manrope,sans-serif', color: '#A78BFA' }}>{b.valor}</p>
                <p className="text-xs mt-1 leading-tight" style={{ color: '#6B7280' }}>{b.label}</p>
              </div>
            ))}
          </div>

          {/* Caracteristicas */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: '#6B7280' }}>Caracteristicas principales</h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {sol.caracteristicas.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm" style={{ color: '#D1D5DB' }}>
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(91,33,208,0.3)' }}>
                    <svg width="8" height="8" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Tecnologias */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#6B7280' }}>Tecnologias</h3>
            <div className="flex flex-wrap gap-2">
              {sol.tech.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'rgba(91,33,208,0.2)', color: '#C4B5FD', border: '1px solid rgba(91,33,208,0.35)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Ideal para */}
          <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,33,208,0.2)' }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>Ideal para</h3>
            <p className="text-sm" style={{ color: '#D1D5DB' }}>{sol.ideal}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pb-1">
            <button
              onClick={() => { onClose(); const el = document.getElementById('contacto'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' }) }}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200"
              style={{ background: 'linear-gradient(135deg,#5B21D0,#7C3AED)', color: '#fff', boxShadow: '0 0 24px rgba(91,33,208,0.3)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
            >
              Solicitar demo gratuita
            </button>
            <button
              onClick={() => { onClose(); const el = document.getElementById('soporte'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' }) }}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(124,58,237,0.4)', color: '#A78BFA' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(91,33,208,0.2)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)' }}
            >
              Abrir ticket de consulta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LineaNegocio() {
  const [selected, setSelected] = useState<Solucion | null>(null)

  return (
    <section id="linea" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0C0C10 0%, #111118 50%, #0C0C10 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(91,33,208,0.1) 0%, transparent 70%)'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <SectionLabel>Línea de Negocio</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Nuestras <GradientText>soluciones inteligentes</GradientText>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#9CA3AF' }}>
            Un portafolio de aplicaciones propias diseñadas para cada desafío empresarial, con inteligencia artificial en su núcleo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUCIONES.map((sol) => (
            <div
              key={sol.name}
              className="rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,33,208,0.18)', backdropFilter: 'blur(8px)' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(124,58,237,0.6)'; el.style.background = 'rgba(91,33,208,0.08)'; el.style.boxShadow = '0 8px 40px rgba(91,33,208,0.2)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.borderColor = 'rgba(91,33,208,0.18)'; el.style.background = 'rgba(255,255,255,0.03)'; el.style.boxShadow = '' }}
            >
              <div className="flex items-start justify-between gap-2">
                <AIBadge />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Manrope, sans-serif', color: '#F5F5F7' }}>{sol.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{sol.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {sol.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: 'rgba(91,33,208,0.2)', color: '#C4B5FD', border: '1px solid rgba(91,33,208,0.3)' }}>{t}</span>
                ))}
              </div>
              <button
                onClick={() => setSelected(sol)}
                className="mt-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{ background: 'rgba(91,33,208,0.15)', border: '1px solid rgba(124,58,237,0.4)', color: '#A78BFA' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(91,33,208,0.4)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(91,33,208,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = '#A78BFA' }}
              >
                Ver solución →
              </button>
            </div>
          ))}
        </div>
      </div>

      {selected && <SolucionModal sol={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

// ─── Clientes ─────────────────────────────────────────────────────────────────

const CLIENTES_LOGOS = [
  { nombre: 'InkaRetail', sector: 'Retail & e-commerce', inicial: 'IR' },
  { nombre: 'BancoPeru', sector: 'Finanzas & banca', inicial: 'BP' },
  { nombre: 'Salud360', sector: 'Salud & telemedicina', inicial: 'S3' },
  { nombre: 'LogisTrans', sector: 'Logística & supply chain', inicial: 'LT' },
  { nombre: 'EduFutura', sector: 'Educación & e-learning', inicial: 'EF' },
  { nombre: 'Constructec', sector: 'Construcción & real estate', inicial: 'CT' },
  { nombre: 'AgriSmart', sector: 'Agroindustria', inicial: 'AS' },
  { nombre: 'MediCorp', sector: 'Farmacéutica', inicial: 'MC' },
]

const CASOS = [
  {
    client: 'InkaRetail',
    sector: 'Retail · Lima, Perú',
    avatar: 'IR',
    testimonio: '"THESEUSOFT transformó completamente nuestra atención al cliente. En 3 meses redujimos costos operativos en un 40% sin sacrificar la calidad."',
    autor: 'Carlos Mendoza',
    cargo: 'Director de Operaciones',
    problema: 'Perdían el 35% de consultas por falta de atención fuera de horario laboral, generando abandono de carrito y caída en ventas.',
    solucion: 'AI Customer Support con agente conversacional 24/7 integrado en web, app y WhatsApp. Escalamiento automático a agente humano para casos complejos.',
    tech: ['NLP', 'Rasa', 'WhatsApp API', 'React'],
    metricas: [
      { valor: '78%', label: 'Menos tiempo de respuesta' },
      { valor: '92%', label: 'Satisfacción del cliente' },
      { valor: '+S/ 280K', label: 'Ventas recuperadas / año' },
    ],
  },
  {
    client: 'BancoPeru',
    sector: 'Finanzas · Lima, Perú',
    avatar: 'BP',
    testimonio: '"Lo que antes tomaba 3 días ahora ocurre en 4 minutos. El impacto en la velocidad de decisión de nuestra junta directiva fue inmediato."',
    autor: 'Ana Flores',
    cargo: 'Chief Data Officer',
    problema: 'Generación manual de reportes ejecutivos tardaba 3 días hábiles e involucraba a 6 analistas, con alto riesgo de error humano.',
    solucion: 'AI Analytics con dashboards ejecutivos en tiempo real, alertas predictivas de riesgo crediticio y modelos de forecast de cartera.',
    tech: ['Python', 'TensorFlow', 'BigQuery', 'D3.js'],
    metricas: [
      { valor: '4 min', label: 'Generación de reportes' },
      { valor: '99.3%', label: 'Precisión de datos' },
      { valor: '6 sem.', label: 'ROI positivo' },
    ],
  },
  {
    client: 'Constructec',
    sector: 'Construcción · Arequipa, Perú',
    avatar: 'CT',
    testimonio: '"Pasamos de 45 a 12 días por contratación. El sistema filtra mejor que cualquier headhunter y los candidatos que llegan ya vienen pre-evaluados."',
    autor: 'Roberto Salas',
    cargo: 'Gerente de RRHH',
    problema: 'Proceso de reclutamiento de operarios y técnicos tardaba 45 días promedio, con alta tasa de rotación temprana (38% en los primeros 3 meses).',
    solucion: 'Smart Recruitment con screening automático de CVs, scoring por perfil técnico, test situacionales con IA y agenda de entrevistas sin fricciones.',
    tech: ['ML', 'OpenAI', 'Next.js', 'MongoDB'],
    metricas: [
      { valor: '12 días', label: 'Tiempo de contratación' },
      { valor: '60%', label: 'Mejor calidad de candidatos' },
      { valor: '22%', label: 'Menos rotación temprana' },
    ],
  },
  {
    client: 'LogisTrans',
    sector: 'Logística · Callao, Perú',
    avatar: 'LT',
    testimonio: '"La automatización de nuestros flujos operativos nos permitió escalar de 800 a 2,400 envíos diarios con el mismo equipo. Increíble."',
    autor: 'Sandra Torres',
    cargo: 'VP de Tecnología',
    problema: 'Procesos manuales de despacho, seguimiento y facturación no escalaban. Errores frecuentes y clientes insatisfechos con la falta de visibilidad.',
    solucion: 'Automatización Empresarial con flujos RPA para despacho, portal de seguimiento en tiempo real y facturación automática integrada con SUNAT.',
    tech: ['RPA', 'n8n', 'Node.js', 'REST API'],
    metricas: [
      { valor: '3x', label: 'Capacidad operativa' },
      { valor: '94%', label: 'Precisión en despachos' },
      { valor: '-65%', label: 'Tiempo de facturación' },
    ],
  },
  {
    client: 'EduFutura',
    sector: 'Educación · Lima, Perú',
    avatar: 'EF',
    testimonio: '"El asistente IA responde dudas de nuestros estudiantes a las 2 AM con la misma calidad que un tutor senior. Nuestros NPS subieron 28 puntos."',
    autor: 'Daniela Quispe',
    cargo: 'Directora de Producto',
    problema: 'Plataforma de e-learning con 18,000 estudiantes activos sin soporte 24/7. Deserción alta por falta de acompañamiento en horarios nocturnos.',
    solucion: 'AI Business Assistant personalizado como tutor virtual con contexto de cada curso, historial del estudiante y derivación a docente cuando es necesario.',
    tech: ['GPT-4o', 'LangChain', 'FastAPI', 'React'],
    metricas: [
      { valor: '+28pts', label: 'NPS de estudiantes' },
      { valor: '-31%', label: 'Tasa de deserción' },
      { valor: '18K', label: 'Estudiantes atendidos' },
    ],
  },
  {
    client: 'Salud360',
    sector: 'Salud · Lima, Perú',
    avatar: 'S3',
    testimonio: '"Implementamos el sistema en 6 semanas. Hoy procesamos 1,200 citas diarias con cero llamadas perdidas y los médicos dedican más tiempo a pacientes."',
    autor: 'Dr. Javier Ortega',
    cargo: 'Gerente General',
    problema: 'Centro médico con 40 especialistas perdía el 28% de citas potenciales por desbordamiento de llamadas y procesos de agendamiento manual.',
    solucion: 'AI Customer Support especializado en salud con agendamiento de citas, recordatorios automáticos, triaje inicial y gestión de urgencias.',
    tech: ['NLP', 'Twilio', 'PostgreSQL', 'Vue.js'],
    metricas: [
      { valor: '0%', label: 'Llamadas perdidas' },
      { valor: '1,200', label: 'Citas gestionadas / dia' },
      { valor: '+41%', label: 'Ingresos por consultas' },
    ],
  },
]

function ClienteLogo({ c }: { c: typeof CLIENTES_LOGOS[0] }) {
  return (
    <div
      className="rounded-xl h-24 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-default"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,33,208,0.15)' }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(124,58,237,0.45)'; el.style.background = 'rgba(91,33,208,0.07)' }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(91,33,208,0.15)'; el.style.background = 'rgba(255,255,255,0.03)' }}
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-extrabold" style={{ background: 'linear-gradient(135deg,#5B21D0,#7C3AED)', color: '#fff', fontFamily: 'Manrope,sans-serif' }}>
        {c.inicial}
      </div>
      <p className="text-xs font-bold" style={{ color: '#E9D5FF', fontFamily: 'Manrope,sans-serif' }}>{c.nombre}</p>
      <p className="text-xs" style={{ color: '#6B7280' }}>{c.sector}</p>
    </div>
  )
}

function CasoCard({ caso }: { caso: typeof CASOS[0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,33,208,0.2)' }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(124,58,237,0.45)' }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(91,33,208,0.2)' }}
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(90deg,rgba(91,33,208,0.35),rgba(124,58,237,0.15))' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0" style={{ background: 'linear-gradient(135deg,#5B21D0,#7C3AED)', color: '#fff', fontFamily: 'Manrope,sans-serif' }}>
          {caso.avatar}
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: '#F5F5F7', fontFamily: 'Manrope,sans-serif' }}>{caso.client}</p>
          <p className="text-xs" style={{ color: '#A78BFA' }}>{caso.sector}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Testimonio */}
        <blockquote className="text-sm leading-relaxed italic" style={{ color: '#D1D5DB' }}>
          {caso.testimonio}
        </blockquote>
        <div>
          <p className="text-xs font-semibold" style={{ color: '#E9D5FF' }}>{caso.autor}</p>
          <p className="text-xs" style={{ color: '#6B7280' }}>{caso.cargo}</p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-3 gap-2">
          {caso.metricas.map((m) => (
            <div key={m.label} className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(91,33,208,0.15)', border: '1px solid rgba(91,33,208,0.25)' }}>
              <p className="text-base font-extrabold" style={{ color: '#A78BFA', fontFamily: 'Manrope,sans-serif' }}>{m.valor}</p>
              <p className="text-xs leading-tight mt-0.5" style={{ color: '#6B7280' }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Expandable detail */}
        {expanded && (
          <div className="flex flex-col gap-3 pt-2 border-t" style={{ borderColor: 'rgba(91,33,208,0.2)' }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#6B7280' }}>Problema</p>
              <p className="text-sm" style={{ color: '#D1D5DB' }}>{caso.problema}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#6B7280' }}>Solución implementada</p>
              <p className="text-sm" style={{ color: '#D1D5DB' }}>{caso.solucion}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {caso.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(91,33,208,0.2)', color: '#C4B5FD', border: '1px solid rgba(91,33,208,0.3)' }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{ border: '1px solid rgba(124,58,237,0.4)', color: '#A78BFA', background: 'transparent' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(91,33,208,0.2)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          {expanded ? 'Ocultar detalle ↑' : 'Ver caso completo →'}
        </button>
      </div>
    </div>
  )
}

function Clientes() {
  return (
    <section id="clientes" className="py-24" style={{ background: '#0C0C10' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <SectionLabel>Clientes</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Empresas que <GradientText>confían en nosotros</GradientText>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#9CA3AF' }}>
            Trabajamos con empresas de distintos sectores en Lima y el interior del país, ayudándolas a competir con inteligencia artificial.
          </p>
        </div>

        {/* Logos grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {CLIENTES_LOGOS.map((c) => <ClienteLogo key={c.nombre} c={c} />)}
        </div>

        {/* Casos de éxito */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>Casos de éxito</h3>
          <p className="text-sm mt-2" style={{ color: '#6B7280' }}>Resultados reales medidos tras 90 días de implementación</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASOS.map((caso) => <CasoCard key={caso.client} caso={caso} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Ticket de Soporte ────────────────────────────────────────────────────────

const QUICK_CATS = [
  { label: 'Problema técnico' },
  { label: 'Ayuda con una app' },
  { label: 'Solicitud de cambio' },
  { label: 'Reportar incidencia' },
  { label: 'Consulta general' },
]

const TIMELINE = [
  { step: '01', title: 'Registro', desc: 'Tu ticket es recibido y se genera un número único de seguimiento.' },
  { step: '02', title: 'Evaluación', desc: 'Nuestro equipo analiza la solicitud y determina la prioridad.' },
  { step: '03', title: 'Asignación', desc: 'Se asigna al especialista o equipo más adecuado para tu caso.' },
  { step: '04', title: 'Resolución', desc: 'Trabajamos en la solución y te mantenemos informado del progreso.' },
  { step: '05', title: 'Validación', desc: 'Confirmamos contigo que la solución fue satisfactoria.' },
  { step: '06', title: 'Cierre', desc: 'El ticket se cierra y se documenta en nuestra base de conocimiento.' },
]

function Soporte() {
  const [submitted, setSubmitted] = useState(false)
  const [ticketNum, setTicketNum] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nombre: '', empresa: '', correo: '', telefono: '',
    tipo: '', producto: '', prioridad: '', asunto: '', descripcion: ''
  })
  const [selectedCat, setSelectedCat] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await publicService.createTicket({
        name: form.nombre, email: form.correo, company: form.empresa,
        category: form.tipo || selectedCat, subject: form.asunto,
        message: `${form.descripcion}\n\nProducto: ${form.producto || 'No especificado'}\nPrioridad: ${form.prioridad}\nTeléfono: ${form.telefono || 'No especificado'}`,
      })
      setTicketNum(data.ticketNumber)
      setSubmitted(true)
    } catch {
      setError('No se pudo registrar el ticket. Inténtalo nuevamente en unos minutos.')
    } finally { setLoading(false) }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(91,33,208,0.3)',
    color: '#F5F5F7',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <section id="soporte" className="py-24" style={{ background: '#111118' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <SectionLabel>Soporte</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Ticket de <GradientText>Atención</GradientText>
          </h2>
          <p style={{ color: '#9CA3AF' }}>Estamos aquí para ayudarte. Describe tu solicitud y te atendemos con prioridad.</p>
        </div>

        {/* Quick categories */}
        <div className="mb-12">
          <h3 className="text-lg font-bold mb-5 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>¿En qué te podemos ayudar?</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {QUICK_CATS.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCat(cat.label)}
                className="flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: selectedCat === cat.label ? 'rgba(91,33,208,0.35)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${selectedCat === cat.label ? '#7C3AED' : 'rgba(91,33,208,0.25)'}`,
                  color: selectedCat === cat.label ? '#E9D5FF' : '#9CA3AF'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(91,33,208,0.2)' }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: 'rgba(91,33,208,0.3)' }}>✅</div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>¡Ticket registrado!</h3>
                <p style={{ color: '#9CA3AF' }}>Tu número de ticket es:</p>
                <div className="text-3xl font-extrabold px-8 py-4 rounded-2xl" style={{ fontFamily: 'Manrope, sans-serif', background: 'rgba(91,33,208,0.25)', border: '1px solid #7C3AED', color: '#A78BFA' }}>
                  {ticketNum}
                </div>
                <p className="text-sm max-w-xs" style={{ color: '#6B7280' }}>Recibirás una confirmación a tu correo. Nuestro equipo te contactará en menos de 24 horas hábiles.</p>
                <button onClick={() => setSubmitted(false)} className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'rgba(91,33,208,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#A78BFA' }}>
                  Nuevo ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Formulario de atención</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Nombre completo *</label>
                    <input required style={inputStyle} placeholder="Tu nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} onFocus={(e) => { e.target.style.borderColor = '#7C3AED' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(91,33,208,0.3)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Empresa</label>
                    <input style={inputStyle} placeholder="Tu empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} onFocus={(e) => { e.target.style.borderColor = '#7C3AED' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(91,33,208,0.3)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Correo electrónico *</label>
                    <input required type="email" style={inputStyle} placeholder="correo@empresa.com" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} onFocus={(e) => { e.target.style.borderColor = '#7C3AED' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(91,33,208,0.3)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Teléfono</label>
                    <input style={inputStyle} placeholder="+51 999 999 999" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} onFocus={(e) => { e.target.style.borderColor = '#7C3AED' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(91,33,208,0.3)' }} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Tipo de solicitud *</label>
                    <select required style={{ ...inputStyle, cursor: 'pointer' }} value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} onFocus={(e) => { e.target.style.borderColor = '#7C3AED' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(91,33,208,0.3)' }}>
                      <option value="">Seleccionar</option>
                      <option>Problema técnico</option>
                      <option>Solicitud de cambio</option>
                      <option>Consulta</option>
                      <option>Incidencia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Producto / App</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.producto} onChange={(e) => setForm({ ...form, producto: e.target.value })} onFocus={(e) => { e.target.style.borderColor = '#7C3AED' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(91,33,208,0.3)' }}>
                      <option value="">Seleccionar</option>
                      {SOLUCIONES.map((s) => <option key={s.name}>{s.name}</option>)}
                      <option>Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Prioridad *</label>
                    <select required style={{ ...inputStyle, cursor: 'pointer' }} value={form.prioridad} onChange={(e) => setForm({ ...form, prioridad: e.target.value })} onFocus={(e) => { e.target.style.borderColor = '#7C3AED' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(91,33,208,0.3)' }}>
                      <option value="">Seleccionar</option>
                      <option>Baja</option>
                      <option>Media</option>
                      <option>Alta</option>
                      <option>Crítica</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Asunto *</label>
                  <input required style={inputStyle} placeholder="Breve descripción del problema" value={form.asunto} onChange={(e) => setForm({ ...form, asunto: e.target.value })} onFocus={(e) => { e.target.style.borderColor = '#7C3AED' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(91,33,208,0.3)' }} />
                </div>
                {error && <p className="rounded-lg p-3 text-sm" role="alert" style={{ color: '#FCA5A5', background: 'rgba(239,68,68,0.12)' }}>{error}</p>}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Descripción detallada *</label>
                  <textarea
                    required
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Describe el problema o solicitud con el mayor detalle posible..."
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                    onFocus={(e) => { e.target.style.borderColor = '#7C3AED' }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(91,33,208,0.3)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Adjuntar archivo</label>
                  <div className="rounded-xl p-4 text-center text-sm cursor-pointer transition-all duration-200" style={{ background: 'rgba(91,33,208,0.08)', border: '2px dashed rgba(91,33,208,0.3)', color: '#9CA3AF' }}>
                    📎 Arrastra un archivo o haz clic para adjuntar
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="mt-2 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #5B21D0, #7C3AED)', color: '#fff' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                >
                  {loading ? 'Registrando ticket...' : 'Enviar ticket de soporte'}
                </button>
              </form>
            )}
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-bold mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Procedimiento de atención</h3>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, #5B21D0, rgba(91,33,208,0.1))' }} />
              <div className="flex flex-col gap-6">
                {TIMELINE.map((item, i) => (
                  <div key={item.step} className="flex gap-5 relative">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 z-10"
                      style={{
                        background: i === 0 ? 'linear-gradient(135deg, #5B21D0, #7C3AED)' : 'rgba(91,33,208,0.2)',
                        border: '1px solid rgba(124,58,237,0.4)',
                        color: i === 0 ? '#fff' : '#A78BFA',
                        fontFamily: 'Manrope, sans-serif'
                      }}
                    >
                      {item.step}
                    </div>
                    <div className="pt-3">
                      <h4 className="font-bold mb-1" style={{ fontFamily: 'Manrope, sans-serif', color: '#E9D5FF' }}>{item.title}</h4>
                      <p className="text-sm" style={{ color: '#6B7280' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contáctanos ──────────────────────────────────────────────────────────────

function Contacto() {
  const [cForm, setCForm] = useState({ nombre: '', correo: '', mensaje: '' })
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [contactLoading, setContactLoading] = useState(false)

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(91,33,208,0.3)',
    color: '#F5F5F7',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <section id="contacto" className="py-24" style={{ background: 'linear-gradient(180deg, #0C0C10, #111118)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <SectionLabel>Contáctanos</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Hablemos de tu próxima<br /><GradientText>solución inteligente</GradientText>
          </h2>
          <p style={{ color: '#9CA3AF' }}>¿Tienes un proyecto en mente? Cuéntanos y lo convertimos en realidad.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            {[
              { title: 'Dirección', line1: 'Av. Tecnología 1200, Piso 8', line2: 'San Isidro, Lima, Perú' },
              { title: 'Teléfonos', line1: '+51 (01) 234-5678', line2: '+51 999 123 456' },
              { title: 'Email', line1: 'hola@theseusoft.com', line2: 'soporte@theseusoft.com' },
              { title: 'WhatsApp', line1: '+51 987 654 321', line2: 'Lun–Vie 9:00 AM – 6:00 PM' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,33,208,0.18)' }}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#6B7280' }}>{item.title}</p>
                  <p className="text-sm font-medium" style={{ color: '#E9D5FF' }}>{item.line1}</p>
                  <p className="text-sm" style={{ color: '#9CA3AF' }}>{item.line2}</p>
                </div>
              </div>
            ))}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200" style={{ background: '#25D366', color: '#fff' }} onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}>
                Escribir por WhatsApp
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200" style={{ background: 'rgba(91,33,208,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#A78BFA' }} onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(91,33,208,0.35)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(91,33,208,0.2)' }}>
                Enviar correo
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(91,33,208,0.2)', color: '#9CA3AF' }} onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)' }}>
                Llamar ahora
              </button>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-48 flex items-center justify-center relative" style={{ background: 'rgba(91,33,208,0.08)', border: '1px solid rgba(91,33,208,0.25)' }}>
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(91,33,208,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,33,208,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="text-center relative z-10">
                <p className="text-sm font-medium" style={{ color: '#A78BFA' }}>Mapa — San Isidro, Lima, Perú</p>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Haz clic para ver en Google Maps</p>
              </div>
            </div>
          </div>

          {/* Quick contact form */}
          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(91,33,208,0.2)' }}>
            <h3 className="text-lg font-bold mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Envíanos un mensaje</h3>
            <form className="flex flex-col gap-4" onSubmit={async (e) => {
              e.preventDefault(); setContactStatus('idle'); setContactLoading(true)
              try { await publicService.sendContact({ name: cForm.nombre, email: cForm.correo, message: cForm.mensaje }); setContactStatus('success'); setCForm({ nombre: '', correo: '', mensaje: '' }) }
              catch { setContactStatus('error') } finally { setContactLoading(false) }
            }}>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Nombre</label>
                <input style={inputStyle} placeholder="Tu nombre completo" value={cForm.nombre} onChange={(e) => setCForm({ ...cForm, nombre: e.target.value })} onFocus={(el) => { el.target.style.borderColor = '#7C3AED' }} onBlur={(el) => { el.target.style.borderColor = 'rgba(91,33,208,0.3)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Correo</label>
                <input type="email" style={inputStyle} placeholder="tu@correo.com" value={cForm.correo} onChange={(e) => setCForm({ ...cForm, correo: e.target.value })} onFocus={(el) => { el.target.style.borderColor = '#7C3AED' }} onBlur={(el) => { el.target.style.borderColor = 'rgba(91,33,208,0.3)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>Mensaje</label>
                <textarea rows={6} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Cuéntanos sobre tu proyecto o consulta..." value={cForm.mensaje} onChange={(e) => setCForm({ ...cForm, mensaje: e.target.value })} onFocus={(el) => { el.target.style.borderColor = '#7C3AED' }} onBlur={(el) => { el.target.style.borderColor = 'rgba(91,33,208,0.3)' }} />
              </div>
              <button
                type="submit"
                disabled={contactLoading}
                className="py-3 rounded-xl text-sm font-bold transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #5B21D0, #7C3AED)', color: '#fff', boxShadow: '0 0 24px rgba(91,33,208,0.3)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
              >
                {contactLoading ? 'Enviando...' : 'Enviar mensaje'}
              </button>
              {contactStatus === 'success' && <p className="text-sm text-center" style={{ color: '#A7F3D0' }}>Mensaje enviado. Te responderemos pronto.</p>}
              {contactStatus === 'error' && <p role="alert" className="text-sm text-center" style={{ color: '#FCA5A5' }}>No se pudo enviar el mensaje. Inténtalo nuevamente.</p>}
              <p className="text-xs text-center" style={{ color: '#6B7280' }}>También puedes escribirnos a <span style={{ color: '#A78BFA' }}>hola@theseusoft.com</span></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      title: 'Empresa',
      links: ['Nosotros', 'Misión y visión', 'Valores', 'Certificaciones', 'Blog'],
    },
    {
      title: 'Soluciones',
      links: ['AI Business Assistant', 'AI Customer Support', 'AI Analytics', 'Smart Recruitment', 'Automatización'],
    },
    {
      title: 'Soporte',
      links: ['Ticket de atención', 'Documentación', 'Estado del sistema', 'FAQ', 'Contacto soporte'],
    },
    {
      title: 'Contacto',
      links: ['hola@theseusoft.com', '+51 (01) 234-5678', 'WhatsApp', 'LinkedIn', 'GitHub'],
    },
  ]

  const socials = ['LinkedIn', 'GitHub', 'X (Twitter)', 'YouTube']

  return (
    <footer style={{ background: '#0C0C10', borderTop: '1px solid rgba(91,33,208,0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center shrink-0" style={{ width: 32, height: 32, borderRadius: 800, background: 'linear-gradient(135deg, #5B21D0, #7C3AED)' }}>
                <svg width="18" height="18" viewBox="0 0 64 64" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 6C32 6 20 10 16 20C12 30 18 36 18 36C18 36 12 34 8 38C4 42 6 50 6 50C6 50 12 44 20 46C28 48 30 54 32 58C34 54 36 48 44 46C52 44 58 50 58 50C58 50 60 42 56 38C52 34 46 36 46 36C46 36 52 30 48 20C44 10 32 6 32 6Z" opacity="0.9"/>
                  <path d="M32 14C32 14 24 18 22 26C20 32 24 36 24 36C24 36 20 35 18 38C16 40 17 44 17 44C17 44 21 40 26 42C29 43.5 30 47 32 50C34 47 35 43.5 38 42C43 40 47 44 47 44C47 44 48 40 46 38C44 35 40 36 40 36C40 36 44 32 42 26C40 18 32 14 32 14Z"/>
                  <circle cx="32" cy="30" r="5" opacity="0.8"/>
                </svg>
              </span>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 16, letterSpacing: '-0.03em' }}>
                <span style={{ color: '#F5F5F7' }}>THESEU</span><span style={{ color: '#7C3AED' }}>SOFT</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
              Creamos tecnología que piensa contigo. Soluciones web inteligentes impulsadas por IA para empresas que buscan transformarse.
            </p>
            <div className="flex gap-3 flex-wrap">
              {socials.map((s) => (
                <button key={s} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200" style={{ background: 'rgba(91,33,208,0.15)', border: '1px solid rgba(91,33,208,0.25)', color: '#A78BFA' }} onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(91,33,208,0.3)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(91,33,208,0.15)' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: '#A78BFA', fontFamily: 'Manrope, sans-serif' }}>{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors duration-200" style={{ color: '#6B7280' }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#C4B5FD' }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#6B7280' }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: '1px solid rgba(91,33,208,0.15)' }}>
          <p className="text-xs" style={{ color: '#4B5563' }}>© 2026 THESEUSOFT. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            {['Política de privacidad', 'Términos de uso', 'Cookies'].map((link) => (
              <a key={link} href="#" className="text-xs transition-colors duration-200" style={{ color: '#4B5563' }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#A78BFA' }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4B5563' }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <Hero />
      <Nosotros />
      <LineaNegocio />
      <Clientes />
      <Soporte />
      <Contacto />
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}

