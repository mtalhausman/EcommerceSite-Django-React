# 🛒 Full Stack E-Commerce Application

A full-stack e-commerce web application built with **Django REST Framework**, **React**, and **PostgreSQL**.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React JS |
| Backend | Django REST Framework (DRF) |
| Database | PostgreSQL |
| Authentication | JWT (SimpleJWT) |

---

## ✨ Features

- User Registration & Login (JWT Authentication)
- Product Listings
- Shopping Cart Management
- Address & Phone Management
- Payment Flow & Success Redirect
- REST API integration between Frontend and Backend
- Media/Image Upload support

---

## 📁 Project Structure

```
FirstDjangoEcommerce/
├── backend/              # Django REST Framework backend
│   ├── backend/          # Project settings, URLs
│   ├── store/            # Main app (models, views, serializers)
│   ├── media/            # Uploaded media files
│   ├── manage.py
│   ├── requirements.txt
│   └── .env              # Environment variables (not pushed to GitHub)
│
├── frontend/             # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── venv/                 # Virtual environment (not pushed to GitHub)
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Python 3.x
- Node.js & npm
- PostgreSQL

---

### 1. Clone the Repository

```bash
git clone https://github.com/mtalhausman/ecommerce-django-react.git
cd ecommerce-django-react
```

---

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` folder:

```env
SECRET_KEY=your-django-secret-key
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

```bash
# Run migrations
python manage.py migrate

# Start backend server
python manage.py runserver
```

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/token/` | Login - Get JWT Token |
| POST | `/api/token/refresh/` | Refresh JWT Token |
| POST | `/api/register/` | Register new user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/` | Get all products |
| GET | `/api/products/<id>/` | Get single product |
| GET | `/api/categories/` | Get all categories |

### Cart (Authentication Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart/` | Get user's cart |
| POST | `/api/cart/add/` | Add product to cart |
| POST | `/api/cart/remove/` | Remove item from cart |
| POST | `/api/cart/update/` | Update item quantity |

### Orders (Authentication Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/order/create/` | Place an order (COD supported) |

---

## 👨‍💻 Author

**Muhammad Talha Usman**
- GitHub: [@mtalhausman](https://github.com/mtalhausman)
- LinkedIn: [linkedin.com/in/mtalhausman](https://linkedin.com/in/mtalhausman)

---

## 📌 Note

This is a practice project built to strengthen full-stack development skills using Django, React, and PostgreSQL.
