import type { AuthResponse, LoginRequest } from "@/models/api"
import api from "./api"

export const authService = {
  async login(payload: LoginRequest) {
    const { data } = await api.post<AuthResponse>("/auth/login", payload)
    localStorage.setItem("theseusoft_token", data.token)
    return data
  },
  logout: () => localStorage.removeItem("theseusoft_token"),
}
