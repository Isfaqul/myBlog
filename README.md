# Personal Blog – Full Stack Monorepo

This repository contains the full stack code for my personal blog.

It is structured as a monorepo and includes:

- A public user-facing site
- An admin dashboard
- A backend API server

All three parts work together but are deployed separately.

---

## Project Structure

```
apps/
  api/        → Express + Prisma backend
  user/       → Public blog frontend (React + Vite)
  admin/      → Admin dashboard (React + Vite)
```

---

## Tech Stack

### Frontend (User + Admin)

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- JWT-based authentication
- bcrypt for password hashing

---

## Authentication

Authentication is handled using JSON Web Tokens (JWT).

- Users log in and receive a token.
- Admin users have role-based access.
- Protected routes are secured through middleware that verifies and decodes the token.

The admin app can only access protected routes when authenticated.

---

## Deployment

- Backend → Render
- Frontend apps → Netlify
- Database → Supabase (PostgreSQL)

Each app is deployed independently but connects through environment variables.

---

This project was built as a learning-focused, real-world full stack application, with an emphasis on clean structure, authentication, and deployment.
