# ncom- E-Commerce Store

A full-stack e-commerce web application built with Node.js, Express, MongoDB, and vanilla HTML/CSS/JS.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + bcrypt

## Features
- User Register & Login
- Product Listing
- Add to Cart
- Place Orders
- JWT Protected Routes

## How to Run

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
Open `frontend/index.html` with Live Server in VS Code.

## API Endpoints
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/products` — Get all products
- `POST /api/products` — Add product
- `POST /api/orders` — Place order (auth required)
- `GET /api/orders` — Get orders (auth required)