# CastIt 🗳️  
A secure, Aadhaar-based online voting application built with **Node.js** that enables users to vote for candidates in real time with live vote counts.

## 🚀 Features
- **User Authentication** – Sign up / Login using Aadhaar number and password.
- **Vote Casting** – Vote for a single candidate from the list.
- **Live Vote Count** – View candidates sorted by real-time vote counts.
- **Admin Panel** – Add, update, and remove candidates (admin cannot vote).
- **Profile Management** – Change password and view user details.
- **Data Privacy** – Secure handling of Aadhaar details.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** (Add your DB here, e.g., MongoDB / MySQL)
- **Authentication:** Aadhaar number + password
- **API Structure:** RESTful routes

## 📌 API Endpoints

### User Authentication
- `POST /signup` – Register a new user.
- `POST /login` – Login with Aadhaar and password.

### Voting
- `GET /candidates` – Get list of candidates.
- `POST /vote/:candidateId` – Vote for a candidate.

### Vote Counts
- `GET /vote/counts` – Get candidates sorted by votes.

### Profile
- `GET /profile` – View user profile.
- `PUT /profile/password` – Change password.

### Admin
- `POST /candidates` – Add a candidate.
- `PUT /candidates/:candidateId` – Update a candidate.
- `DELETE /candidates/:candidateId` – Remove a candidate.

## 📂 Project Structure
CastIt/
│-- src/
│-- public/
│-- package.json
│-- .gitignore
│-- README.md


## ⚡ Installation & Setup
```bash
# Clone the repository
git clone https://github.com/your-username/CastIt.git

# Navigate to project folder
cd CastIt

# Install dependencies
npm install

# Start the server
npm start
```

Security Notes
Aadhaar details are stored securely.

Admin accounts are restricted from voting.
