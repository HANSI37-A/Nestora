# Nestora 🛋️✨

A production-ready full-stack luxury furniture e-commerce platform for homes and offices — featuring a curated product collection, cart system, Stripe checkout, order management, and a comprehensive admin panel.

🌐 **Live Demo:** [furniture-nestorafront.vercel.app](https://furniture-nestorafront.vercel.app)

---

## ✨ Features

### Customer Storefront
- Browsable product catalog with category & designer filtering
- Advanced collection filtering with URL param sync
- Shopping cart with guest & authenticated user support
- Secure checkout with **Stripe** payment integration
- Order history and detailed order tracking
- Architectural Showrooms showcase page
- Designer profiles and curated collections
- User profile with account management

### Admin Panel
- Product management — create, edit, delete, image upload via Cloudinary
- Order management with status updates
- Designer & Showroom management
- Category management
- User management
- Subscriber & contact message management

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19 + Vite, Redux Toolkit, Tailwind CSS, Axios, React Router DOM |
| Backend | Node.js + Express v5, MongoDB + Mongoose v9, JWT, bcryptjs |
| Payments | Stripe |
| Media | Cloudinary (image upload & storage) |
| Email | Resend API |
| DevOps | Vercel (frontend + backend), MongoDB Atlas |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- Cloudinary, Stripe & Resend accounts

### Installation

```bash
# Clone the repo
git clone https://github.com/HANSI37-A/Nestora.git
cd Nestora

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### Run in Development

```bash
# Terminal 1 — Backend (runs on port 5000)
cd server && npm run dev

# Terminal 2 — Frontend (runs on port 5173)
cd client && npm run dev
```

---

## 🔐 Environment Variables

### Backend — `server/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/nestora
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=

RESEND_API_KEY=
CONTACT_RECEIVER=your@email.com
```

### Frontend — `client/.env`

```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 📁 Project Structure

```
Nestora/
├── client/                         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Static assets
│   │   ├── components/             # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── pages/                  # Customer & admin pages
│   │   ├── redux/
│   │   │   ├── slice/              # authSlice, cartSlice, orderSlice, etc.
│   │   │   └── store.js            # Redux store configuration
│   │   └── utils/                  # Axios instance
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
└── server/                         # Node.js backend
    ├── config/                     # MongoDB connection
    ├── controller/                 # Route handler functions
    ├── data/                       # Seed data
    ├── middleware/                  # Auth guard (protect)
    ├── models/                     # Mongoose schemas
    ├── routes/                     # API route definitions
    ├── .env
    ├── .gitignore
    ├── index.js                    # Express app entry point
    ├── package.json
    ├── seeder.js                   # Database seeder
    └── vercel.json
```

---

## 📡 API Reference

| Resource | Endpoints |
|---|---|
| Auth | `POST /api/users/login` · `POST /api/users/register` |
| Products | `GET /api/products` · `POST /api/admin/products` · `PUT /api/admin/products/:id` |
| Cart | `GET /api/cart` · `POST /api/cart` · `DELETE /api/cart` |
| Orders | `POST /api/orders` · `GET /api/orders/my-orders` · `GET /api/orders/:id` |
| Showrooms | `GET /api/showrooms` · `GET /api/showrooms/:id` |
| Designers | `GET /api/designers` · `GET /api/designers/:id` |
| Categories | `GET /api/categories` |
| Upload | `POST /api/upload` |
| Subscribe | `POST /api/subscribe` |
| Contact | `POST /api/contact` |

---

## 🔑 Key Implementation Details

- **JWT Auth** — Access token stored in Redux + `localStorage` (`userInfo`), attached to every request via Axios request interceptor automatically.
- **Dual Cart** — Guest cart persisted in Redux, authenticated cart synced to MongoDB. Merged on login.
- **Stripe Flow** — Stripe Checkout Session created on order, payment captured and verified server-side before order is saved to DB.
- **Route Protection** — `protect` middleware guards all private API routes. Admin routes additionally check `isAdmin` flag.
- **Express Route Ordering** — Specific routes (`/my-orders`) declared before parameterized routes (`/:id`) to prevent conflicts.
- **Image Uploads** — Cloudinary handles all product and showroom image storage via `multer` + `cloudinary` in the upload route.
- **Empty State Handling** — Backend returns empty shapes (e.g. empty cart `{}`) rather than 404 for first-time users.
- **Auto Logout on 401** — Axios response interceptor clears stale tokens and redirects to login automatically.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#F9F7F2` (cream/ivory) |
| Primary Accent | `#6B543D` (walnut brown) |
| CTA / Text | `#1A1A1A` (near black) |
| Heading Font | Playfair Display, Cormorant Garamond |
| Body Font | Jost |

---

## 🚢 Deployment

- **Frontend** → Vercel (`furniture-nestorafront` project, root: `client/`)
- **Backend** → Vercel (`furniture_nestora` project, root: `server/`)
- **Database** → MongoDB Atlas (IP whitelist: `0.0.0.0/0` for Vercel)
- **Media** → Cloudinary

---

## Author

**Hansi** — Built as a full-stack portfolio project demonstrating MERN stack, UI/UX design, and production deployment.

[GitHub](https://github.com/HANSI37-A)
