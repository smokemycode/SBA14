# SBA14 – Secure Web Portal

Express + MongoDB API with local login (bcrypt + JWT), GitHub login (Passport), and private bookmarks.

## Setup
1. Run `npm install`
2. Copy `.env.example` to `.env` and fill in real values
3. Create a GitHub OAuth App with callback URL `http://localhost:3000/api/users/auth/github/callback`
4. Run `npm run dev`