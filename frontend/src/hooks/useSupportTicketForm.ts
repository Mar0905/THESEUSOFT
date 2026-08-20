import { useState, type FormEvent } from "react"
import { publicService } from "@/services/publicService"
import { getApiErrorMessage } from "@/utils/getApiErrorMessage"

const initialForm = { name: "", email: "", company: "", phone: "", category: "", product: "", priority: "", subject: "", description: "" }

export function useSupportTicketForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus("loading")
    try {
      const response = await publicService.createTicket({
        name: form.name,
        email: form.email,
        company: form.company,
        category: form.category,
        subject: form.subject,
        message: `${form.description}\n\nProducto: ${form.product || "No especificado"}\nPrioridad: ${form.priority || "No especificada"}\nTeléfono: ${form.phone || "No especificado"}`,
      })
      setStatus("success")
      setMessage(response.ticketNumber)
      setForm(initialForm)
    } catch (error) {
      setStatus("error")
      setMessage(getApiErrorMessage(error, "No se pudo registrar el ticket. Inténtalo nuevamente."))
    }
  }

  return { form, setForm, status, message, submit }
}
