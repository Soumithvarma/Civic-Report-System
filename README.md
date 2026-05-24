# Smart Civic Issue Reporting System

A beginner-friendly MERN Stack web application for reporting and managing civic issues.

## Project Overview

This application allows citizens to report civic issues like road damage, garbage, water leakage, etc., and enables admins to manage and track these issues.

---

## Folder Structure Explained

### Root Project Structure

```
project/
├── client/              # Frontend React application
├── server/              # Backend Node.js application
├── package.json         # Root package.json for combined scripts
└── README.md           # This file
```

### Backend (Server) Structure

```
server/
├── models/             # Database models (schemas)
│   ├── User.js        # User schema definition
│   └── Issue.js       # Issue schema definition
├── routes/             # API route handlers
│   ├── auth.js        # Signup and login routes
│   └── issues.js      # CRUD routes for issues
├── uploads/            # Stores uploaded issue images
├── index.js           # Main server entry point
└── package.json        # Backend dependencies
```

### Frontend (Client) Structure

```
client/
├── src/
│   ├── pages/          # Page components
│   │   ├── Login.jsx      # Login page
│   │   ├── Signup.jsx     # Signup page
│   │   ├── Dashboard.jsx  # Dashboard with statistics
│   │   ├── ReportIssue.jsx # Submit new issue
│   │   └── ViewIssues.jsx  # View all issues
│   ├── components/     # Reusable UI components
│   │   └── Navbar.jsx     # Navigation bar
│   ├── api/            # API configuration
│   │   └── api.js         # API function calls
│   ├── App.jsx        # Main app with routes
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML entry file
├── vite.config.js      # Vite configuration
└── package.json        # Frontend dependencies
```

---

## How the Project Works

### 1. Frontend-Backend Communication

The frontend talks to the backend using the `fetch()` API. All API calls are defined in `client/src/api/api.js`.

**Example API Call:**

```javascript
// Login function in api.js
login: async (email, password) => {
  const response = await fetch('http://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
}
```

**How it works:**
1. Frontend sends HTTP request to backend
2. Backend processes the request
3. Backend sends JSON response
4. Frontend uses the response data

### 2. Authentication Flow

**How Login Works:**

1. User enters email and password on Login page
2. Frontend calls `authAPI.login(email, password)`
3. Backend checks database for user
4. Backend returns user data if credentials are correct
5. Frontend stores user data in `localStorage`
6. User is redirected to Dashboard

**Key Files:**
- `client/src/pages/Login.jsx` - Login form UI
- `server/routes/auth.js` - Login API endpoint
- `client/src/App.jsx` - Protected route logic

**localStorage Usage:**

```javascript
// Store user data
localStorage.setItem('user', JSON.stringify(userData));

// Get user data
const user = JSON.parse(localStorage.getItem('user'));

// Clear on logout
localStorage.removeItem('user');
```

### 3. Database (MongoDB)

**What is MongoDB?**
- NoSQL database that stores data as JSON-like documents
- Flexible schema structure
- Perfect for Node.js applications

**How Models Work:**

```javascript
// User Model (server/models/User.js)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: Date
});
```

**Connection:**

```javascript
// In server/index.js
mongoose.connect('mongodb://127.0.0.1:27017/civic-report')
```

**Database Name:** `civic-report`
**Collections:** `users`, `issues`

### 4. Image Upload

**How Image Upload Works:**

1. User selects image in Report Issue form
2. Frontend creates FormData with the file
3. Backend uses Multer middleware to save file
4. Image is saved in `server/uploads/` folder
5. Image path is stored in database

**Key Files:**
- `client/src/pages/ReportIssue.jsx` - Image selection
- `server/routes/issues.js` - Multer configuration

**Multer Configuration:**

```javascript
const storage = multer.diskStorage({
  destination: 'uploads/',           // Folder to save
  filename: Date.now() + '.jpg'      // Unique filename
});

const upload = multer({ storage });
```

### 5. Admin Features

**Admin Detection:**

```javascript
// Simple admin check
const isAdmin = email === 'admin@civicreport.com';
```

**Admin Capabilities:**
- View all issues
- Update issue status (Pending → In Progress → Resolved)
- Delete issues

---

## Running the Application

### Prerequisites

1. **Node.js** - Install from https://nodejs.org
2. **MongoDB** - Install locally or use MongoDB Atlas

### Step-by-Step Instructions

#### 1. Install MongoDB (if not installed)

**Windows:**
```
Download from: https://www.mongodb.com/try/download/community
```

**Mac:**
```bash
brew install mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
```

#### 2. Start MongoDB

```bash
# Start MongoDB service
mongod

# Or on Mac with Homebrew
brew services start mongodb-community
```

#### 3. Install Dependencies

```bash
# Navigate to project folder
cd project

# Install all dependencies
npm run install-all
```

#### 4. Start the Application

You need to run both frontend and backend:

**Option A - Two Terminal Windows:**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

**Option B - Single Command (from root):**
```bash
npm run dev
```

#### 5. Access the Application

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5001

---

## Demo Credentials

### Admin Account
- **Email:** admin@civicreport.com
- **Password:** admin123

### Citizen Account
- **Email:** citizen@demo.com
- **Password:** demo123

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Create new account |
| POST | /api/auth/login | Login to account |

### Issues
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/issues | Get all issues |
| POST | /api/issues | Create new issue |
| PUT | /api/issues/:id | Update issue status |
| DELETE | /api/issues/:id | Delete issue |

---

## Key Files Explained

### Backend Files

**server/index.js:**
- Main entry point for backend
- Connects to MongoDB
- Sets up Express server
- Loads all routes
- Seeds demo users on startup

**server/models/User.js:**
- Defines user data structure
- Fields: name, email, password, createdAt
- Used for authentication

**server/models/Issue.js:**
- Defines issue/complaint structure
- Fields: title, description, category, location, image, status, userId
- Status can be: Pending, In Progress, Resolved

**server/routes/auth.js:**
- POST /signup - Creates new user
- POST /login - Validates credentials
- Returns user data for localStorage

**server/routes/issues.js:**
- GET / - Returns all issues (with filtering)
- POST / - Creates new issue with image
- PUT /:id - Updates issue status
- DELETE /:id - Removes issue

### Frontend Files

**client/src/App.jsx:**
- Main application component
- Defines all routes
- Implements protected routes
- Shows navbar only when logged in

**client/src/main.jsx:**
- Entry point for React
- Renders the App component
- Sets up React Router

**client/src/api/api.js:**
- All API function calls
- Handles communication with backend
- Uses fetch() for HTTP requests

**client/src/pages/Login.jsx:**
- Login form UI
- Calls auth API
- Stores user in localStorage
- Redirects to dashboard

**client/src/pages/Signup.jsx:**
- Registration form UI
- Validates password match
- Creates new user account

**client/src/pages/Dashboard.jsx:**
- Shows welcome message
- Displays statistics (total, pending, in progress, resolved)
- Lists recent issues
- Quick action buttons

**client/src/pages/ReportIssue.jsx:**
- Form to submit new issues
- Image upload functionality
- Category dropdown
- Location input

**client/src/pages/ViewIssues.jsx:**
- Displays all issues in cards
- Filter by category and status
- Admin controls for status update and delete

**client/src/components/Navbar.jsx:**
- Responsive navigation bar
- Shows user name and admin badge
- Logout functionality

---

## Understanding the Code

### For Beginners

#### 1. React State Management
```javascript
// Using useState hook
const [email, setEmail] = useState('');

// Update state
<input onChange={(e) => setEmail(e.target.value)} />
```

#### 2. Making API Calls
```javascript
// Using fetch API
const response = await fetch('http://localhost:5001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const data = await response.json();
```

#### 3. Protected Routes
```javascript
// Check if user is logged in
const user = JSON.parse(localStorage.getItem('user'));

// Redirect to login if not authenticated
if (!user) {
  return <Navigate to="/login" />;
}
```

#### 4. MongoDB Operations
```javascript
// Find user
const user = await User.findOne({ email });

// Create new document
const newUser = new User({ name, email, password });
await newUser.save();

// Update document
await Issue.findByIdAndUpdate(id, { status: 'Resolved' });
```

---

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Make sure MongoDB is running:
```bash
mongod
```

**2. Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5001
```
Solution: Kill the process using that port:
```bash
# Find and kill process
npx kill-port 5001
npx kill-port 5173
```

**3. CORS Error:**
Make sure `cors` package is installed and used in server/index.js:
```javascript
app.use(cors());
```

**4. Module Not Found:**
Run npm install again:
```bash
npm run install-all
```

---

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **File Upload:** Multer
- **API Protocol:** RESTful APIs with JSON

---

## Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Basics](https://www.mongodb.com/basics)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## Project Author

Created as a beginner-friendly MERN Stack tutorial project.

Perfect for final-year students learning web development!
