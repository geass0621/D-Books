# D-Books: Fullstack Online Book Store

<p align="center">
  <img src="frontend/public/screenshots/homepage.png" alt="D-Books Home Page" width="80%"/>
</p>

## 📚 Introduction
D-Books is a fullstack web application for an online bookstore, built to showcase modern web development skills. Users can browse, search, and purchase books, with secure authentication, admin management, and Stripe-powered payments. This project is for learning and portfolio purposes only.

---

## 🛠️ Tech Stack
- **Frontend:** React, Redux, TypeScript, TailwindCSS, DaisyUI, Vite
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken), bcryptjs, http-only cookies
- **Validation:** express-validator
- **Payments:** Stripe
- **Deployment:** Render.com (separate frontend & backend services)

<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40"/>
  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40"/>
  <img src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg" alt="stripe" width="40"/>
</p>

---

## ✨ Features
- User registration, login, and JWT authentication (token stored in http-only cookie)
- Admin and normal user roles
- Browse, search, and filter books
- Shopping cart and order management
- Secure Stripe payment integration
- Admin dashboard for managing books and orders
- Input validation with express-validator
- Responsive UI with TailwindCSS & DaisyUI
- Client-side routing (React Router)
- Production-ready CORS, environment variables, and error handling

---

## 🌎 Live Demo
- Visit the website: [D-Books on Render](https://d-books.onrender.com/)

---

## 🖼️ Screenshots
- **Home Page:**
  <img src="frontend/public/screenshots/homepage.png" alt="Home Page" width="80%"/>
- **Books Page:**
  <img src="frontend/public/screenshots/bookspage.png" alt="Books Page" width="80%"/>
- **Cart & Checkout:**
  <img src="frontend/public/screenshots/checkout.png" alt="Cart and Checkout" width="80%"/>
- **Stripe Payment:**
  <img src="frontend/public/screenshots/payment.png" alt="Stripe Payment" width="80%"/>
- **Admin Dashboard:**
  <img src="frontend/public/screenshots/admin.png" alt="Admin Dashboard" width="80%"/>

---

## 🚀 Getting Started

### Prerequisites
- Node.js (see `.node-version` for recommended version)
- MongoDB database (local or cloud)
- Stripe account (for payments)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/d-books.git
cd d-books
```

### 2. Setup environment variables
- Copy `.env.example` (if provided) or create `.env` files in both `backend/` and `frontend/`.
- Fill in all required variables (see code comments and Render deployment section below).

### 3. Install dependencies
```bash
cd backend
npm install
cd ../frontend
npm install
```

### 4. Run locally
- **Backend:**
  ```bash
  cd backend
  npm run dev
  ```
- **Frontend:**
  ```bash
  cd frontend
  npm run dev
  ```
- Visit the frontend URL (usually `http://localhost:5173`)

### 5. Build for production
- **Backend:**
  ```bash
  cd backend
  npm run build
  ```
- **Frontend:**
  ```bash
  cd frontend
  npm run build
  ```

---

## 🌐 Deployment (Render.com)
- Deploy backend and frontend as separate services on Render.
- Set all environment variables in the Render dashboard (see `.env` files for required keys).
- For client-side routing, add a rewrite rule in the Render dashboard:  
  `/api/*` → backend, all other routes → `index.html` (see Render docs)
- Stripe webhook endpoint must match your deployed backend URL.


---

## 📂 Project Structure
```
backend/    # Express API, MongoDB models, Stripe integration
frontend/   # React app, Redux store, UI components
```

## 🧪 Test Accounts

> For testing admin features, please contact the project maintainer for temporary admin credentials.

---

## 🚦 Planned Improvements
- Add automated testing using Mocha and Chai for backend API endpoints.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[MIT](LICENSE)  <!-- Update if you use a different license -->

---

## 🙋‍♂️ Contact
- **Author:** Dong
- email: dongcoung0621@gmail.com
- LinkedIn: https://www.linkedin.com/in/dong-cuong-35b166341/

---

> **Note:** This project is for educational and portfolio purposes only. Do not use in production without a full security review.

