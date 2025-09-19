# Notes Manager (MERN)

## Features
- Register, Login (JWT)
- Create, Read, Update, Delete notes
- Simple UI in React

## Run locally
1. Backend
   - cd server
   - cp .env.example .env (fill values)
   - npm install
   - npm run dev

2. Frontend
   - cd client
   - npm install
   - npm run dev

Open http://localhost:3000

## Deployment
- Deploy backend to Render/Heroku. Set MONGO_URI and JWT_SECRET.
- Deploy frontend to Netlify/Vercel and set VITE_API_BASE to backend URL.

## Submission
- GitHub repo link
- README with setup
- Short video showing register/login, create/edit/delete note
- Optional hosted URL
