📘 Technical Test – Fullstack Web Application

- A fullstack application built with NestJS, PostgreSQL, and React.
The project includes a backend API for managing student scores and a frontend UI for searching and displaying results.

📌 Seed Data Note

- In this project, the seeder only imports the first 9 student records from the diem_thi_thpt_2024.csv file.
This is because my personal laptop processes large CSV files slowly, so limiting the seed to 9 entries ensures the seeding process runs smoothly.

📂 Project Structure

TechnicalTest/
│── backend/       # NestJS + PostgreSQL API
│── frontend/      # React + TailwindCSS UI
│── README.md

🚀 Features

#Backend (NestJS)

-RESTful APIs for student scores
-PostgreSQL integration
-Migration & seeding data
-Fully deployable on Render

#Frontend (React)

-Search scores by student examination ID (SBD)
-Fetch data from deployed backend on Render
-Error + loading handling
-Dynamic charts created with Recharts

🛠️ Technologies

-Frontend: React, Css, Html, Javascript
-Backend: NestJS, PostgreSQL, TypeORM/Prisma
-Deployment: Render (Backend), Vercel (Frontend)

⚙️ Installation
1. Backend Setup

-Install dependencies
cd backend
npm install


-Environment variables
-Create a .env file:
DB_HOST=dpg-d4sonsvgi27c73bqov50-a.virginia-postgres.render.com
DB_PORT=5432
DB_USERNAME=technical_test_db_hatl_user
DB_PASSWORD=lvWt8qXkt2lfxd5H0Wrxgly4y72bhDVX
DB_NAME=technical_test_db_hatl

-Run migrations
(TypeORM)
npm run migration:run


-Seed data

(TypeORM)
npx ts-node -r tsconfig-paths/register src/seed/csv-seeder.ts


-Start development server
npm run start:dev || npm run start:prod

2. Frontend Setup
-Install dependencies
cd frontend
npm install

-Start development server
npm start

🌐 Deployment
Backend (Render)

-Build command:
npm install && npm run build

-Start command:
npm run start:prod

-Frontend (Vercel)

🛠️ Future Improvements

- The following features and enhancements are planned for future versions of the project:

1. Responsive UI Design
- Improve the frontend interface to ensure a smooth and consistent experience across all devices:
 + Desktop
 + Tablet
 + Mobile
- This includes restructuring layout components and improving CSS to support fully responsive behavior.

2. Docker Setup for Development & Deployment
- Provide complete Docker support for both frontend and backend, including:
+ docker-compose.yml
+ Backend container (NestJS + PostgreSQL)
+ Frontend container (React)
+ Environment variable injection
+ Local development using containers
+ Production-ready images
- This will make the project easier to deploy and improve consistency across environments.

3. TailwindCSS Integration
- Add TailwindCSS to the frontend for faster and more maintainable styling:
+ Utility-first CSS classes
+ Improved design consistency
+ Faster UI prototyping
+ Easier responsive design
- The plan includes a full migration from pure CSS to TailwindCSS while keeping the existing UI logic intact.