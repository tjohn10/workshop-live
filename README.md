# AutoShop Starter

This project contains a React + Vite frontend and a simple Express backend (SQLite) that demonstrates:
- Authentication (register & login using JWT)
- Inventory CRUD (protected endpoints)
- Mock payment flow (frontend)

## Run frontend
cd autoshop-starter
npm install
npm run dev

## Run backend
cd backend
npm install
# then
node server.js
# or for dev
npx nodemon server.js

Backend runs on port 4000 by default. Frontend's API base is `http://localhost:4000/api`. You can change this via VITE_API_BASE.

