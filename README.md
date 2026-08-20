# THESEUSOFT — Web corporativa y soporte

Aplicación web corporativa y de soporte de THESEUSOFT. El frontend está construido con React, TypeScript y Vite; el backend es una API REST de Spring Boot.

## Tecnologías

- Frontend: React 19, Vite, TypeScript, Tailwind CSS, React Router, Axios y Lucide React.
- Backend: Java 21, Spring Boot, Spring Security, JWT, Spring Data JPA/Hibernate y Maven.
- Datos: MySQL 8+.

## Estructura

```text
frontend/                  # Aplicación React + TypeScript + Vite
backend/                   # API Spring Boot
```

## Requisitos

Node.js 20+, pnpm, Java 21 y MySQL 8+.

## Ejecutar el frontend

```powershell
cd frontend
pnpm install
Copy-Item .env.example .env
pnpm dev
```

`VITE_API_URL` debe apuntar a `http://localhost:8080/api` (valor documentado en `.env.example`).

## Ejecutar el backend

1. Asegúrate de que MySQL esté disponible. La URL por defecto crea la base `theseusoft` si el usuario tiene permiso.
2. Configura las variables `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` y `JWT_SECRET` según `backend/.env.example`.
3. Ejecuta:

```powershell
cd backend
mvn spring-boot:run
```

Para producción usa una clave JWT Base64 privada de más de 32 bytes y configura `CORS_ALLOWED_ORIGIN` con el dominio publicado.

## Rutas web

- `/`: sitio corporativo con las secciones existentes de Figma.
- `/inicio`, `/nosotros`, `/soluciones`, `/clientes`, `/soporte`, `/contacto`: enlaces directos a las secciones reales.
- `/login`: acceso del personal de soporte.

## API principal

| Método | Ruta | Acceso | Uso |
| --- | --- | --- | --- |
| POST | `/api/contact-messages` | público | Guarda mensajes del formulario de contacto |
| POST | `/api/support-tickets` | público | Registra un ticket y devuelve su código |
| POST | `/api/auth/login` | público | Emite JWT |
| GET | `/api/contact-messages` | `ROLE_ADMIN` | Consulta mensajes |
| GET | `/api/support-tickets` | `ROLE_ADMIN` | Consulta tickets |

En el primer arranque se crea el usuario de desarrollo `admin` con contraseña `ChangeMe123!`. Cámbiala antes de publicar.
