# Spring Boot Backend for User Authentication & Product Management

This project is a Spring Boot-based REST API that supports:

- User registration and login with role-based access.
- Excel-based product uploads.
- Fetching all products.
- Updating product prices by ID.

The backend is designed to be consumed by a **React frontend** (running on `http://localhost:5173`).

---

## 📁 Project Structure

### 1. **User Management (`UsersController.java`)**
- `POST /addUser`  
  → Registers a new user.

- `POST /loginUser`  
  → Authenticates a user and returns name & role if credentials are valid.

### 2. **Product Management (`ProductController.java`)**
- `POST /product/upload`  
  → Uploads an Excel file and saves product data to the database.

- `GET /product`  
  → Fetches all products.

- `PUT /product/update-price/{productId}`  
  → Updates the price of a product by its ID.

---

## ⚙️ Technologies Used

- **Java 17**
- **Spring Boot**
- **Spring Web**
- **Spring Data JPA**
- **H2 / MySQL** (depending on config)
- **Multipart File Handling**
- **CORS Configuration** for integration with React (`http://localhost:5173`)

---

## 🛠 Setup & Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
