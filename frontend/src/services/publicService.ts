import type { ContactMessageRequest, SupportTicketRequest, SupportTicketResponse } from "@/models/api"
import api from "./api"

export const publicService = {
  createTicket: async (payload: SupportTicketRequest) => {
    const { data } = await api.post<SupportTicketResponse>("/support-tickets", payload)
    return data
  },
  sendContact: (payload: ContactMessageRequest) => api.post("/contact-messages", payload),
}
