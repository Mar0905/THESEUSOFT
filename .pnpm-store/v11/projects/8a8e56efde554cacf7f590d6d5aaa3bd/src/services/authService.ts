import api from "./api"
import type { AuthResponse } from "@/models/api"

export const authService = {
  async login(username: string, password: string) {
    const { data } = await api.post<AuthResponse>("/auth/login", { username, password })
    localStorage.setItem("theseusoft_token", data.token)
    return data
  },
  logout() { localStorage.removeItem("theseusoft_token") },
}
