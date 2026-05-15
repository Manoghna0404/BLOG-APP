# 📝 Blog App

A full-stack blog application built with React, Express.js, and MongoDB. Features user authentication, role-based access control, article management, and an admin dashboard.

![React](https://img.shields.io/badge/React-19.2.0-blue.svg)
![Express.js](https://img.shields.io/badge/Express.js-5.2.1-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-red.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)

## 🚀 Features

### 👤 User Management
- **User Registration & Login** - Secure authentication with JWT tokens
- **Role-based Access Control** - Three user roles: USER, AUTHOR, ADMIN
- **Profile Management** - Update user profiles with image upload

### ✍️ Content Management
- **Article Creation** - Authors can write and publish articles
- **Article Management** - Edit, delete, and manage article status
- **Rich Content** - Support for text content with categories
- **Comment System** - Users can comment on articles

### 👨‍💼 Admin Dashboard
- **User Management** - Block/unblock users, view user statistics
- **Content Moderation** - Activate/deactivate articles
- **Dashboard Analytics** - View system statistics and metrics
- **Complete Control** - Full administrative access to all data

### 🎨 User Interface
- **Modern Design** - Clean, Apple-inspired UI with Tailwind CSS
- **Responsive Layout** - Works on desktop and mobile devices
- **Intuitive Navigation** - Role-based navigation and protected routes
- **Toast Notifications** - User feedback for all actions

## 🏗️ Architecture

```
blog-app/
├── backend/                 # Express.js API server
│   ├── APIs/               # Route handlers
│   │   ├── AdminAPI.js    # Admin endpoints
│   │   ├── AuthorAPI.js   # Author endpoints
│   │   ├── UserAPI.js     # User endpoints
│   │   └── CommonAPI.js   # Shared endpoints
│   ├── config/            # Configuration files
│   ├── middlewares/       # Custom middleware
│   ├── models/           # MongoDB schemas
│   ├── services/         # Business logic
│   └── server.js         # Main server file
├── frontend/              # React application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── store/        # Zustand state management
│   │   ├── styles/       # CSS styles
│   │   └── main.jsx      # App entry point
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling
- **React Hot Toast** - Notification system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image hosting and management
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (v8.0 or higher)
- **npm** or **yarn** package manager

## 🚀 Quick Start
### Manual Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/blog-app.git
   cd blog-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   node server.js
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Database Setup**
   ```javascript
   // Run in MongoDB shell
   db.users.insertOne({
       firstName: "admin",
       lastName: "admin",
       role: "ADMIN",
       email: "admin@mail.com",
       password: "$2a$12$zBYi4VNPbfV1qhe78SnujeiDkZ1.RkYDO6kTLx4MAj3Sshbw/cr5u",
       isActive: true,
       createdAt: new Date(),
       updatedAt: new Date()
   })
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database
DB_URL=mongodb://localhost:27017/blog-backend

# Server
PORT=4000

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary (for image uploads)
CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
```

## 📱 Usage

### Default Admin Account
- **Email:** `admin@mail.com`
- **Password:** `admin`

### User Roles

1. **USER** - Can read articles and leave comments
2. **AUTHOR** - Can create, edit, and manage their own articles
3. **ADMIN** - Full system access including user and content management

### API Endpoints

#### Authentication
- `POST /common-api/login` - User login
- `POST /common-api/logout` - User logout
- `GET /common-api/check-auth` - Check authentication status

#### User Operations
- `POST /user-api/users` - Register as user
- `GET /user-api/articles` - Get all active articles
- `GET /user-api/article/:id` - Get single article
- `PUT /user-api/articles` - Add comment to article

#### Author Operations
- `POST /author-api/users` - Register as author
- `POST /author-api/articles` - Create new article
- `GET /author-api/articles/:authorId` - Get author's articles
- `PUT /author-api/articles` - Update article

#### Admin Operations
- `GET /admin-api/dashboard/stats` - Get dashboard statistics
- `GET /admin-api/users` - Get all users
- `GET /admin-api/articles` - Get all articles
- `PUT /admin-api/users/block/:userId` - Block user
- `PUT /admin-api/users/unblock/:userId` - Unblock user
- `PUT /admin-api/articles/activate/:articleId` - Activate article
- `PUT /admin-api/articles/deactivate/:articleId` - Deactivate article

## 🧪 Testing

### Running Tests

```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend linting
cd frontend
npm run lint
```

### Manual Testing

1. **Register** as different user types (USER, AUTHOR)
2. **Login** with different roles and test permissions
3. **Create articles** as an author
4. **Comment on articles** as a user
5. **Access admin dashboard** and test user/article management

## 🚀 Deployment

### Backend Deployment

```bash
# Build for production
cd backend
npm run build

# Start production server
npm start
```

### Frontend Deployment

```bash
# Build for production
cd frontend
npm run build

# Serve the dist folder with any static server
```

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework
- [MongoDB](https://www.mongodb.com/) - A document database
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy blogging! 🎉**