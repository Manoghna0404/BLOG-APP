# 🌐 MyBlog Backend API

Backend server for the **MyBlog Application** built using **Node.js**, **Express.js**, and **MongoDB**.  
This API powers authentication, article management, role-based dashboards, comments, and admin operations for the blogging platform.

---

# ✨ Core Features

## 🔐 Authentication & Authorization
- JWT-based Authentication
- Secure HTTP-only Cookies
- Protected Routes
- Role-Based Access Control

## 👤 User Module
- User Registration & Login
- Profile Image Upload
- Read Articles
- Add Comments
- Search Articles

## ✍️ Author Module
- Create Articles
- Edit Articles
- Delete / Restore Articles
- Manage Personal Content

## 🛡️ Admin Module
- Manage Users
- Block / Unblock Accounts
- Monitor Articles
- Platform Administration

## ☁️ Cloud Integration
- Cloudinary Image Upload
- Multer File Handling
- Secure Media Storage

---

# 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| 🟢 Node.js | Runtime Environment |
| ⚡ Express.js | Backend Framework |
| 🍃 MongoDB | Database |
| 📦 Mongoose | ODM |
| 🔑 JWT | Authentication |
| 🔒 bcryptjs | Password Encryption |
| ☁️ Cloudinary | Image Hosting |
| 📤 Multer | File Uploads |
| 🌍 CORS | Cross-Origin Requests |
| ⚙️ dotenv | Environment Variables |

---

# 📁 Project Architecture

```bash
backend/
│
├── APIs/
│   ├── AdminAPI.js
│   ├── AuthorAPI.js
│   ├── UserAPI.js
│   └── CommonAPI.js
│
├── config/
│   ├── cloudinary.js
│   ├── cloudinaryUpload.js
│   └── multer.js
│
├── middlewares/
│   ├── verifyToken.js
│   └── checkAuthor.js
│
├── models/
│   ├── UserModel.js
│   └── ArticleModel.js
│
├── services/
│   └── authServices.js
│
├── server.js
├── package.json
└── .env
```

---

# 🚀 Getting Started

## 📥 Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=4000

DB_URL=your_mongodb_connection

JWT_SECRET=your_secret_key

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

---

# ▶️ Run The Server

```bash
node server.js
```

Server runs at:

```bash
http://localhost:4000
```

---

# 🔗 API Endpoints

# 🔐 Authentication APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/common-api/login` | User Login |
| GET | `/common-api/logout` | Logout |
| GET | `/common-api/check-auth` | Check User Authentication |
| PUT | `/common-api/change-password` | Change Password |

---

# 👤 User APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/user-api/users` | Register User |
| GET | `/user-api/articles` | Fetch All Articles |
| GET | `/user-api/article/:id` | Fetch Single Article |
| PUT | `/user-api/articles` | Add Comment |
| GET | `/user-api/articles/search/:title` | Search Articles |

---

# ✍️ Author APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/author-api/users` | Register Author |
| POST | `/author-api/articles` | Create Article |
| PUT | `/author-api/articles` | Update Article |
| PATCH | `/author-api/articles/:id/status` | Delete / Restore Article |

---

# 🛡️ Admin APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/admin-api/users` | Fetch All Users |
| GET | `/admin-api/articles` | Fetch All Articles |
| PUT | `/admin-api/users/block/:id` | Block User |
| PUT | `/admin-api/users/unblock/:id` | Unblock User |

---

# 🗄️ Database Models

## 👤 User Schema

```js
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: ['USER', 'AUTHOR', 'ADMIN'],
  profileImageUrl: String,
  isActive: Boolean
}
```

---

## 📰 Article Schema

```js
{
  author: ObjectId,
  title: String,
  category: String,
  content: String,
  comments: [],
  isArticleActive: Boolean
}
```

---

# 🔒 Security Features

✅ Password Hashing using bcryptjs  
✅ JWT Token Verification  
✅ Protected API Routes  
✅ HTTP-only Cookies  
✅ Input Validation  
✅ Secure File Upload Handling  

---

# ☁️ Cloudinary Support

This project uses Cloudinary for:

- Profile Images
- Article Images
- Cloud Media Storage
- Optimized Image Delivery

---

# 🧠 Backend Concepts Used

✨ REST APIs  
✨ Middleware  
✨ Authentication & Authorization  
✨ MVC Pattern  
✨ MongoDB Relationships  
✨ File Upload Handling  
✨ Error Handling  
✨ Role-Based Access  

---

# 🚀 Future Improvements

- Email Verification
- Forgot Password
- Real-Time Notifications
- Article Likes & Bookmarks
- Pagination
- AI Article Suggestions
- Analytics Dashboard

---

# 👩‍💻 Developed By

## 💖 Lakshmi Manoghna

Full Stack Capstone Project — Blogging Platform

---

# 📜 License

This project is developed for educational and learning purposes only.

---

<div align="center">

### ⭐ Star this repository if you liked the project ⭐

</div>