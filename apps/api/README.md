# API Server

This is the backend for my blog.

It is built with Node.js, Express, and TypeScript.

The API is responsible for:

- Serving blog posts
- Handling comments
- Managing authentication
- Protecting admin-only routes
- Connecting to the database

## Tech Stack

- Express for routing and middleware
- Prisma as the ORM
- PostgreSQL (hosted on Supabase)
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing

## Authentication

The authentication system is role-based.

Users can log in and receive a JWT token.
Admin users have additional permissions, such as:

- Creating posts
- Editing posts
- Publishing or unpublishing content
- Managing comments

Protected routes are secured using middleware that verifies and decodes the JWT before allowing access.

## Database

Prisma handles the database layer and migrations.
The API connects to a PostgreSQL database hosted on Supabase.

---

This server is deployed separately and serves data to both the public site and the admin site.
