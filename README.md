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

## 📂 Project Structure

Voting-App/
│
├── models/ # Mongoose schemas (User, Candidate, Vote)
├── routes/ # API route handlers
├── middleware/
│ └── jwtAuthMid.js # JWT authentication middleware
│
├── db.js # MongoDB connection setup
├── server.js # Application entry point
├── votesData.json # Sample / test voting data
│
├── .env # Environment variables
├── package.json
└── package-lock.json


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/Voting-App.git
cd Voting-App
2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


⚠️ Never commit your .env file to GitHub

4️⃣ Start the Server
npm start

or (if using nodemon)
npm run dev

Server will run on:

http://localhost:3000

🔐 Authentication Flow
User registers / logs in
Server issues a JWT token
Token is required in request headers:
Authorization: Bearer <token>

Protected routes validate token using jwtAuthMid.js

📡 API Endpoints (Overview)
Auth Routes
POST /auth/register – Register a new user
POST /auth/login – Login user

Candidate Routes
POST /candidates – Add a candidate (Admin)
GET /candidates – Get all candidates

Voting Routes
POST /vote – Cast a vote
GET /votes/count – Get vote counts

📌 Exact routes may vary — check the routes/ directory for implementation details.

🛡️ Security Considerations:
JWT token validation on protected routes
One-vote-per-user logic enforced
Environment variables secured with dotenv
MongoDB schemas validated with Mongoose

🧪 Testing
You can test APIs using:
Postman

Thunder Client (VS Code)
Make sure to include JWT tokens in protected requests.

Future Improvements:
✅ Role-based access control (Admin/Voter)
📊 Live vote dashboard
🧾 Audit logs for votes
🧪 Unit & integration tests
🚀 Docker deployment

 Contributing:
1.Contributions are welcome!
2.Fork the repository
3.Create a new branch
4.Commit your changes
5.Open a Pull Request

👨‍💻 Author
Abhinendra Singh
Backend Developer | Node.js | MongoDB

⭐ If you find this project useful, consider giving it a star!



