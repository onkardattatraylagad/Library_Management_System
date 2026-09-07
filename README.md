# Library Management System

A full-stack library management system built with a React frontend, a Spring Boot backend, and a MySQL database. The frontend is designed for static hosting on Netlify later, while the backend runs as a separate Java service.

## Project structure

```text
library-management-system/
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── vite.config.js
├── database/
│   └── library_management.sql
├── README.md
├── .gitignore
└── .env.example (optional shared config placeholder)
```

## Prerequisites

- Java 21
- Maven 3.9.x or newer
- Node.js 22+ or compatible current LTS
- npm 11+
- MySQL 8

## Database setup

1. Open MySQL Workbench or MySQL CLI.
2. Run the SQL script in `database/library_management.sql`.
3. Make sure the database named `library_management` is created.
4. Update your backend password in `backend/src/main/resources/application.properties`.

Example:

```properties
spring.datasource.password=CHANGE_ME
```

Replace `CHANGE_ME` with your actual local MySQL password.

## Backend setup

From the project root:

```bash
cd backend
mvn spring-boot:run
```

On Windows, you can also run:

```powershell
cd backend
mvnw.cmd spring-boot:run
```

If Maven wrapper is generated, the wrapper form is also supported:

```bash
./mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

## Frontend setup

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Frontend environment variables

Copy the example file and adjust it if needed:

```bash
cp frontend/.env.example frontend/.env
```

Example content:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## API overview

### Books

- `POST /api/books`
- `GET /api/books`
- `GET /api/books/{id}`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`
- `GET /api/books/search?keyword=`

### Users

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/{id}`
- `GET /api/users/role/{role}`

### Issue / return

- `POST /api/issues`
- `PUT /api/issues/{issueId}/return`

### Dashboard

- `GET /api/dashboard`

## Notes

- The application is designed to run on localhost first.
- Frontend and backend are intentionally kept in separate folders.
- CORS is configured for `http://localhost:5173` and can later be extended for Netlify in production.
- Authentication is kept as a future extension, as required for the initial version.

## Default sample users

- Admin: `admin@library.com` / `admin123`
- Student: `student1@library.com` / `student123`
- Student: `student2@library.com` / `student123`

## Important configuration values

- `backend/src/main/resources/application.properties`
  - MySQL URL
  - MySQL username
  - MySQL password (`CHANGE_ME` must be replaced)
- `frontend/.env`
  - API base URL (default: `http://localhost:8080/api`)

## License

This project is intended for educational and local development purposes.
