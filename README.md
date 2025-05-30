
Here's a professionally written and thorough `README.md` file for your **DealDeli** project:

---

# DealDeli

**DealDeli** is a microservices-based web application designed to help users compare grocery product prices across major UK supermarkets including Tesco, Sainsbury’s, Aldi, and ASDA. The system fetches product data from multiple sources, allows user account management, tracks search behavior, and displays analytical insights—all through a modular and scalable architecture.

---

## 📁 Project Structure

```
DealDeli-final/
├── analytics_microservice/
├── databases/
├── frontend_microservice/
├── price_microservice/
├── user_microservice/
├── docker-compose.yml
└── README.md
```

---

## 🧩 Microservices Overview

| Microservice                | Description                                                               |
| --------------------------- | ------------------------------------------------------------------------- |
| **user\_microservice**      | Handles user registration, login, and authentication                      |
| **price\_microservice**     | Fetches and returns price data for products from a central MySQL database |
| **analytics\_microservice** | Logs search behavior and serves visual insights using SQL queries         |
| **frontend\_microservice**  | Static frontend using HTML/CSS/JavaScript to interact with users          |

> Note: The MySQL database is shared among microservices but **is not** a standalone microservice.

---

## 🐳 Docker & Microservice Orchestration

This project uses Docker Compose to orchestrate all microservices in isolated containers.

### ✅ Prerequisites

* Docker & Docker Compose
* Git
* MySQL 8.0 Workbench
* Python 3.9 or above

### 📦 Build and Run Locally

```bash
# Step 1: Clone the repository
git clone https://github.com/prajwalram2698/DealDeli.git
cd DealDeli-final

# Step 2: configure the database settings in the files according to your host and user credentials from MySql server 

# Step 3: Start all services
docker-compose up --build
```

Once running, the services will be available at:

| Service                | URL                                |
| ---------------------- | ---------------------------------- |
| Frontend               | `http://localhost:5501/index.html` |
| Price Microservice     | `http://localhost:5002/`           |
| User Microservice      | `http://localhost:5001/`           |
| Analytics Microservice | `http://localhost:5003/`           |

---
Open a browser and paste the URL of frontend `http://localhost:5501/index.html`.

## 🛠️ Tech Stack

* **Backend:** Python (Flask), SQLAlchemy, MySQL
* **Frontend:** HTML, CSS, JavaScript
* **Database:** MySQL 8.0
* **Containerization:** Docker, Docker Compose
* **Deployment (optional):** Google Cloud Run (via Artifact Registry)

---

## 💡 Features

* 🔐 User authentication with secure credentials
* 🛍️ Product search with price comparison across multiple retailers
* 📊 Real-time analytics visualizations (Top Searched, Category Insights)
* 💾 Persistent storage with MySQL database and structured product schema
* ⚙️ Modular microservices for easy maintenance and scaling

---

## 📂 Database Initialization

MySQL database tables are initialized automatically using the `init.sql` script located in `analytics_microservice/database/`.

```sql
CREATE DATABASE IF NOT EXISTS dealdeli_data;
USE dealdeli_data;

CREATE TABLE IF NOT EXISTS search_logs (...);
CREATE TABLE IF NOT EXISTS products (...);
```

---


