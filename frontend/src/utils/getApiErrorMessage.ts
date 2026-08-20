import axios from "axios"
import type { ApiError } from "@/models/api"

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<ApiError>(error)) return fallback
  return error.response?.data.message ?? fallback
}
