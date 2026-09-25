# Library Management System

The application now includes:

- Admin authentication with **ID `root` and password `root`**.
- A dedicated **Add Student** section at `/students/add`.
- Ten starter student records and ten starter book records. They are inserted by the SQL script and are also safely initialized by the backend when the application starts.

Run the database script, start the Spring Boot backend on port 8080, then start the Vite frontend on port 5173. The default database password can be supplied with `DB_PASSWORD`.
