# 🗳️ Voting App Backend

A secure and scalable **Voting Application Backend** built with **Node.js, Express, MongoDB**, and **JWT Authentication**.  
This project provides APIs for managing candidates, casting votes, and retrieving vote counts with proper authorization.

---

## 🚀 Features

- 🔐 JWT-based Authentication & Authorization
- 👤 Voter & Candidate Management
- 🗳️ Secure Vote Casting (one vote per user)
- 📊 Real-time Vote Count Updates
- 🛡️ Middleware-protected Routes
- 🗄️ MongoDB Database Integration
- ⚙️ RESTful API Architecture

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Environment Config:** dotenv  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/Voting-App.git
cd Voting-App
```
2️⃣ Install Dependencies
```
npm install
```


3️⃣ Configure Environment Variables
Create a .env file in the root directory:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```


⚠️ Never commit your .env file to GitHub

4️⃣ Start the Server
```
npm start
```
or (if using nodemon)
```
npm run dev
```
Server will run on:
```
http://localhost:3000
```

## Authentication Flow
User registers / logs in

Server issues a JWT token

Token is required in request headers:

```
Authorization: Bearer <token>
```
**Protected routes validate token using jwtAuthMid.js**

📡 API Endpoints (Overview)

**Auth Routes**

* POST /auth/register – Register a new user

* POST /auth/login – Login user

**🛡️ Security Considerations**

* JWT token validation on protected routes

* One-vote-per-user logic enforced

* Environment variables secured with dotenv

* MongoDB schemas validated with Mongoose

**🧪 Testing**

You can test APIs using:

* Postman

* Thunder Client (VS Code)

Make sure to include JWT tokens in protected requests.

**📈 Future Improvements**

* ✅ Role-based access control (Admin/Voter)

* 📊 Live vote dashboard

* 🧾 Audit logs for votes

* 🧪 Unit & integration tests

* 🚀 Docker deployment

**🤝 Contributing**

Contributions are welcome!

* Fork the repository

* Create a new branch

* Commit your changes

* Open a Pull Request

**👨‍💻 Author**

Abhinendra Singh
Backend Developer | Node.js | MongoDB


⭐ If you find this project useful, consider giving it a star!


---
