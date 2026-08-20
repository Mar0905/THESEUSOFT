import api from "./api"
import type { ContactRequest, SupportTicketRequest } from "@/models/api"

export const publicService = {
  createTicket: (payload: SupportTicketRequest) => api.post("/support-tickets", payload),
  sendContact: (payload: ContactRequest) => api.post("/contact-messages", payload),
}
