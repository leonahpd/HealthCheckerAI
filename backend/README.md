# Healthcare Symptom Checker Backend

Node.js + Express API with MongoDB for authentication, patient management, and symptom checking.

## Stack
- Node.js 18+
- Express
- MongoDB with Mongoose
- JWT auth, bcrypt
- express-validator, helmet, cors, morgan

## Setup
```bash
cd backend
npm install
```

Create `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/healthcare?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=replace-me
AI_API_KEY=your-ai-api-key-here
NODE_ENV=development
```

## Run
```bash
npm start          # production
npm run dev        # with nodemon
```

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/me
- GET  /api/patients
- GET  /api/patients/:id
- POST /api/patients
- PUT  /api/patients/:id
- DELETE /api/patients/:id
- POST /api/symptoms
- GET  /api/symptoms
- GET  /api/symptoms/:id
- GET  /api/symptoms/patient/:patientId

## Project Structure
- `server.js` – app entry
- `config/` – database connection
- `controllers/` – route handlers
- `middleware/` – auth middleware
- `models/` – Mongoose models
- `routes/` – API routes
- `utils/aiService.js` – AI placeholder

## Notes
- AI service is mocked; wire to your provider in `utils/aiService.js`.
- Ensure MongoDB is reachable before starting.
