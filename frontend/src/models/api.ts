export type ApiError = { message?: string; errors?: Record<string, string> }

export type LoginRequest = { username: string; password: string }
export type AuthResponse = { token: string; username: string; roles: string[] }

export type ContactMessageRequest = {
  name: string
  email: string
  company?: string
  message: string
}

export type SupportTicketRequest = {
  name: string
  email: string
  company?: string
  category: string
  subject: string
  message: string
}

export type SupportTicketResponse = { ticketNumber: string }
