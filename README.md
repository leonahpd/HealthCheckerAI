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


├── backend
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── patientController.js
│   │   └── symptomController.js
│   ├── Dockerfile
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   ├── Patient.js
│   │   ├── SymptomQuery.js
│   │   └── User.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── routes
│   │   ├── auth.js
│   │   ├── patients.js
│   │   └── symptoms.js
│   ├── server.js
│   └── utils
│       ├── aiService.js
│       ├── emailService.js
│       └── emailTemplates.js
├── frontend
│   ├── Dockerfile
│   ├── nginx
│   │   └── default.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── App.js
│       ├── components
│       │   ├── Auth
│       │   │   ├── Auth.css
│       │   │   ├── ForgotPassword.css
│       │   │   ├── ForgotPassword.js
│       │   │   ├── Login.js
│       │   │   ├── PrivateRoute.js
│       │   │   ├── Register.js
│       │   │   ├── ResetPassword.css
│       │   │   └── ResetPassword.js
│       │   └── Layout
│       │       ├── Header.css
│       │       ├── Header.js
│       │       ├── Layout.css
│       │       ├── Layout.js
│       │       ├── Sidebar.css
│       │       └── Sidebar.js
│       ├── context
│       │   └── AuthContext.js
│       ├── index.css
│       ├── index.js
│       ├── pages
│       │   ├── DashboardPage.css
│       │   ├── DashboardPage.js
│       │   ├── ForgotPasswordPage.css
│       │   ├── ForgotPasswordPage.js
│       │   ├── LoginPage.js
│       │   ├── PatientsPage.css
│       │   ├── PatientsPage.js
│       │   ├── RegisterPage.js
│       │   ├── ResetPasswordPage.css
│       │   ├── ResetPasswordPage.js
│       │   ├── SymptomCheckerPage.css
│       │   └── SymptomCheckerPage.js
│       └── services
│           ├── api.js
│           └── auth.js
├── k8s
│   ├── backend.yaml
│   ├── frontend.yaml
│   └── mongodb.yaml
└── README.md



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

cd HealthChecker-AI

```

#### 2. installation 

```bash
 

# Install dependencies

  Kubernetes cluster ( single node cluter )
  install docker 

  1. login to the control node

     git clone <git URL>
      


```

The backend will run on **http://localhost:5000**

#### 3. Frontend  pod setup 

```bash
cd cd /HealthChecker-AI/fronend


# create docker image 
docker build -t healthai-frontend .
docker tag healthai-frontend   healthai-frontend:latest

#Push your image to your Docker registry
docker login <registry>

docker push leonahpd/healthai-frontend:latest

# create the frontend deployment pod

cd /HealthChecker-AI/k8s 
kubectl create -f frontend.yaml

# 
```

The frontend will run on **http://localhost:3000**

### BACKEND Pod setup 

```bash
cd /HealthChecker-AI/backend

# create docker image

docker build -t healthai-backend .
docker tag healthai-frontend   healthai-backend:latest

#Push your image to your Docker registry
docker login <registry>

docker push healthai-backend:latest

# create the frontend deployment pod

cd /HealthChecker-AI/k8s 
kubectl create -f backend.yaml


#Create the secret for email configuration

kubectl create secret generic backend-secrets \
  --from-literal=EMAIL_USER= <EMAIL_ID> \
  --from-literal=EMAIL_PASS= <TOKEN> \
  --from-literal=JWT_SECRET=supersecretkey123

kubectl create configmap backend-config \
  --from-literal=EMAIL_HOST=smtp.gmail.com \
  --from-literal=EMAIL_PORT=587 \
  --from-literal=FRONTEND_URL=http://<IP>:32019 \
  --from-literal=JWT_EXPIRE=30d

# 
```

# DATABASE POD

cd /HealthChecker-AI/k8s 

kubectl create -f database.yaml

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


 
