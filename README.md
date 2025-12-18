# 🧠 Blog API

**A RESTful API for managing blog posts, users, comments, and likes — built to learn production-grade backend architecture.**

---

## 🚀 Overview

This project is a fully functional **Node.js + Express + TypeScript** backend designed to handle real-world blogging operations.
It’s not just a tutorial-following project — it’s a **complete learning build**, structured and deployed with professional standards in mind.

> Hosted locally on WSL + Nginx reverse proxy, running on PM2, with public endpoints and full API documentation.

---

## 🌐 Live Links

- **Base URL:** [`https://blog-api.nuwandev.site/api/v1`](https://blog-api.nuwandev.site/api/v1)
- **API Docs:** [`https://docs.blog-api.nuwandev.site`](https://docs.blog-api.nuwandev.site)
- **Status Page:** [`https://status.blog-api.nuwandev.site`](https://status.blog-api.nuwandev.site)
- **GitHub Repository:** [`https://github.com/nuwandev/blog-api`](https://github.com/nuwandev/blog-api)

---

## 🧩 Tech Stack

- **Backend Framework:** Express.js (with TypeScript)
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT + HttpOnly Cookies + Token Store (Refresh Tokens in DB)
- **File Uploads:** Cloudinary API
- **Logging:** Winston Logger
- **Rate Limiting:** Express Rate Limit
- **Error Handling:** Centralized middleware-based error responses
- **Monitoring:** BetterStack (Status + Logtail)

---

## 🗂️ Folder Structure

```
src/
│
├── config/                 # Config management
├── controllers/            # Route logic split by resource
│   └── v1/
│       ├── auth/           # login, register, refresh, logout
│       ├── blog/           # CRUD operations for blogs
│       ├── comment/        # Comment endpoints
│       ├── like/           # Like/unlike logic
│       └── user/           # User management
│
├── lib/                    # Utility libraries (JWT, Winston, Cloudinary, etc.)
├── middlewares/            # Auth, validation, file upload, etc.
├── models/                 # Mongoose schemas
├── routes/                 # Organized API routes
└── utils/                  # Reusable helpers
```

---

## 🔐 Authentication Flow

- Users log in or register → receive **access + refresh tokens**.
- **Access Token** (1h) used for authorized routes.
- **Refresh Token** (1w, HttpOnly Cookie) stored in DB and verified before issuing new access tokens.
- Secure, stateful authentication prevents stolen or invalid tokens from being reused.

---

## ⚙️ Environment Configuration

```
PORT=3000
NODE_ENV=development
MONGO_URI=<your-mongo-uri>
LOG_LEVEL=info
JWT_ACCESS_SECRET=<your-access-secret>
JWT_REFRESH_SECRET=<your-refresh-secret>
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=1w
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

---

## 🧠 What I Learned

This project taught me how to:

- Structure a **scalable backend** with modular controllers and routes.
- Implement **secure token-based auth** using HttpOnly cookies + refresh tokens stored in DB.
- Integrate **Cloudinary** for media management.
- Handle **centralized logging** and request validation.
- Deploy a Node API on **WSL (Ubuntu)** using Nginx + PM2.
- Write clean, reusable **TypeScript** server-side code.

---

## 🛠️ Deployment Overview

- **Environment:** Local WSL (Ubuntu)
- **Process Manager:** PM2
- **Reverse Proxy:** Nginx
- **Monitoring:** BetterStack + Logtail
- **Docs Hosting:** GitBook-style static docs deployed separately

---

## 📘 API Highlights

- `POST /auth/register` — Register new users
- `POST /auth/login` — Authenticate and receive tokens
- `POST /auth/refresh-token` — Issue new access tokens
- `GET /blogs/` — Fetch all blogs
- `GET /blogs/user/:userId` — Get blogs by user
- `POST /blogs/` — Create a blog (authenticated)
- `PUT /blogs/:id` — Update blog post
- `DELETE /blogs/:id` — Delete blog
- `POST /comments/` — Add comments to blogs
- `POST /likes/:blogId` — Like or unlike blog
- `GET /users/current` — Get current logged-in user
  …and more!

---

## 🧾 License

**Apache 2.0 License © 2025 nuwandev**

---
