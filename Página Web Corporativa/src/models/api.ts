export type ApiError = { message?: string; errors?: Record<string, string> }

export type SupportTicketRequest = {
  name: string
  email: string
  company?: string
  category: string
  subject: string
  message: string
}

export type ContactRequest = {
  name: string
  email: string
  company?: string
  message: string
}

export type AuthResponse = { token: string; username: string; roles: string[] }
