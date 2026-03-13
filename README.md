# MerryMovers Project

MerryMovers is a full-stack web application for managing moving services, featuring a React frontend and a Spring Boot backend with PostgreSQL integration.

## Project Structure

- **merrymoversweb/**: React 19 frontend application
  - `src/` contains components, pages, and API logic
  - `public/` contains static assets and the main HTML file
  - `package.json` manages dependencies and scripts
- **selmaapi/**: Spring Boot 4 backend API
  - `src/main/java/` contains Java source code (controllers, services, entities, repositories)
  - `src/main/resources/` contains configuration files
  - `pom.xml` manages backend dependencies

## Features

- User registration and login (with secure password hashing)
- Admin dashboard with sidebar navigation
- Booking cart and scheduling
- Product and service pages
- PostgreSQL database integration (via Supabase)

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Java 21
- Maven
- PostgreSQL database (Supabase or local)

### Backend Setup (selmaapi)
1. Configure your database connection in `selmaapi/src/main/resources/application.properties`.
2. From the `selmaapi` directory, build and run:
   ```sh
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```
   The backend runs on port 8081 by default.

### Frontend Setup (merrymoversweb)
1. From the `merrymoversweb` directory, install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm start
   ```
   The frontend runs on port 3000 and proxies API requests to the backend.

### Database Schema
- The `users` table must have a `password_hash` column (no `password` column).
- Hibernate is set to `ddl-auto=validate` to prevent schema drift.
- If you see schema errors, update your database to match the entity mappings.

## Troubleshooting
- If ports 8080/8081 are in use, stop conflicting processes or change the port in `application.properties`.
- Ensure the backend and frontend ports match the proxy settings in `package.json`.
- For registration/login issues, check backend logs and database schema.

## License
This project is for educational/demo purposes. See LICENSE file if present.
