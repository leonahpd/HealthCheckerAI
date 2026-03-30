# HealthChecker-AI 

A full-stack web application for healthcare symptom checking with AI-powered analysis, patient management, and secure authentication.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Patient Management**: Add, view, and manage patient records
- **AI Symptom Checker**: Intelligent symptom analysis using Hugging Face AI models
- **Dashboard**: Overview of recent activities and statistics
- **Responsive Design**: Modern UI that works on all devices
- **RESTful API**: Clean and scalable backend architecture

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger
- **Axios** - HTTP client for AI API calls

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Axios** - API communication
- **Context API** - State management
- **CSS3** - Styling

### AI Integration
- **Hugging Face API** - AI-powered symptom analysis
- **Mistral-7B-Instruct** - Language model for medical insights

## 📁 Project Structure

```
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── patientController.js # Patient CRUD operations
│   │   └── symptomController.js # Symptom checker logic
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Patient.js           # Patient schema
│   │   └── SymptomQuery.js      # Symptom query schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── patients.js          # Patient routes
│   │   └── symptoms.js          # Symptom routes
│   ├── utils/
│   │   └── aiService.js         # Hugging Face API integration
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   └── PrivateRoute.js
│   │   │   └── Layout/
│   │   │       ├── Header.js
│   │   │       ├── Sidebar.js
│   │   │       └── Layout.js
│   │   ├── context/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── PatientsPage.js
│   │   │   └── SymptomCheckerPage.js
│   │   ├── services/
│   │   │   ├── api.js           # Axios instance
│   │   │   └── auth.js          # Auth service
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   └── package.json
│
├── setup.ps1                    # Automated setup script
└── README.md                    # This file
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **Hugging Face API** key

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd un
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the following and update with your credentials:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AI_API_KEY=your_huggingface_api_key
HF_API_KEY=your_huggingface_api_key
AI_MODEL=mistralai/Mistral-7B-Instruct-v0.2
NODE_ENV=development

# Start the server
npm start

# For development with auto-reload
npm run dev
```

The backend will run on **http://localhost:5000**

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm start
```

The frontend will run on **http://localhost:3000**

### Quick Setup (Windows PowerShell)

Run the automated setup script:

```powershell
.\setup.ps1
```

This will:
- Install backend dependencies
- Install frontend dependencies
- Start both servers concurrently

## 🔧 Configuration

### Backend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `AI_API_KEY` | Hugging Face API key | Yes |
| `HF_API_KEY` | Hugging Face API key (alternative) | Yes |
| `AI_MODEL` | AI model to use | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | http://localhost:5000/api |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Patients
- `GET /api/patients` - Get all patients (protected)
- `GET /api/patients/:id` - Get patient by ID (protected)
- `POST /api/patients` - Create new patient (protected)
- `PUT /api/patients/:id` - Update patient (protected)
- `DELETE /api/patients/:id` - Delete patient (protected)

### Symptoms
- `POST /api/symptoms/check` - Analyze symptoms with AI (protected)
- `GET /api/symptoms/history` - Get symptom check history (protected)
- `GET /api/symptoms/history/:id` - Get specific symptom check (protected)

### Health
- `GET /api/health` - Health check endpoint

## 🎨 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View overview of your activities and statistics
3. **Patients**: Manage patient records (add, view, edit, delete)
4. **Symptom Checker**: Enter symptoms and get AI-powered analysis
5. **Navigation**: Use the sidebar to navigate between sections

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes with middleware
- Helmet.js for security headers
- CORS configuration
- Input validation

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Building for Production

### Backend

```bash
cd backend
NODE_ENV=production npm start
```

### Frontend

```bash
cd frontend
npm run build
```

The optimized production build will be in the `build/` directory.


 
