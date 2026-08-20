import { useState, type FormEvent } from "react"
import { publicService } from "@/services/publicService"
import { getApiErrorMessage } from "@/utils/getApiErrorMessage"

const initialForm = { name: "", email: "", company: "", message: "" }

export function useContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus("loading")
    try {
      await publicService.sendContact(form)
      setStatus("success")
      setMessage("Mensaje enviado. Te responderemos pronto.")
      setForm(initialForm)
    } catch (error) {
      setStatus("error")
      setMessage(getApiErrorMessage(error, "No se pudo enviar el mensaje. Inténtalo nuevamente."))
    }
  }

  return { form, setForm, status, message, submit }
}
