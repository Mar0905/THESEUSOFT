import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import NotFoundPage from "@/pages/NotFoundPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inicio" element={<Navigate to="/" replace />} />
      <Route path="/nosotros" element={<Navigate to="/#nosotros" replace />} />
      <Route path="/soluciones" element={<Navigate to="/#linea" replace />} />
      <Route path="/clientes" element={<Navigate to="/#clientes" replace />} />
      <Route path="/soporte" element={<Navigate to="/#soporte" replace />} />
      <Route path="/contacto" element={<Navigate to="/#contacto" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
