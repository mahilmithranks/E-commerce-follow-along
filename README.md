# E-commerce-follow-along

A powerful and scalable backend system for managing an e-commerce platform. Built with **Node.js**, **Express.js**, and **MongoDB**, this backend efficiently handles product management, user authentication, order processing, and payment integration.

---

## 🚀 Features

- **User Management**:
  - User registration, login, and secure authentication using JWT.
  - Profile management and password updates.

- **Product Management**:
  - APIs for adding, updating, deleting, and retrieving product details.
  - Support for product categories, filters, and search functionality.

- **Order Management**:
  - Manage customer orders, track order statuses, and handle order history.

- **Payment Gateway Integration**:
  - Seamless integration with payment providers like Stripe and PayPal for secure transactions.

- **Admin Dashboard Support**:
  - APIs for admin-specific actions, including inventory updates and user account management.

- **RESTful API**:
  - Well-structured, scalable, and documented API endpoints.

- **Scalability**:
  - Designed to handle high traffic and large datasets efficiently.

---

## 🛠 Tech Stack

- **Frontend Framework**: React.js  
- **Backend Framework**: Node.js + Express.js  
- **Database**: MongoDB  

---

## 📌 Milestone 2: Frontend Setup

A simple React.js project styled with Tailwind CSS and using React Router DOM for navigation. This project demonstrates a minimal UI with a centered "Welcome to Home" text and basic routing.

### 🚀 Features

- **React.js Frontend**: Fast and efficient component-based development.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **React Router DOM**: Enables client-side routing and navigation.
- **Minimalist UI**: A clean and simple layout with centered content.
- **Fully Responsive**: Optimized for different screen sizes.

### 🛠 Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Build Tool**: Vite (Optional, if used)

---

## 📌 Milestone 3: Backend Setup & Folder Structure

In this milestone, we focused on structuring the backend, setting up the server, connecting to MongoDB, and implementing basic error handling.

### 🚀 Key Features

#### ✅ **Backend Folder Structure**
A well-organized backend directory following MVC (Model-View-Controller) architecture.

#### ✅ **Server Setup**
- Configured a backend server using **Node.js** and **Express.js**.
- Implemented a **REST API** with Express routes.
- Server listens on a designated port and handles requests efficiently.

#### ✅ **MongoDB Integration**
- Connected the backend to **MongoDB** using Mongoose.
- Established a **database connection** to handle product and user data.
- Created Mongoose models for structured data storage.

#### ✅ **Error Handling**
- Implemented a centralized error-handling system in `utils/errorHandler.js`.
- Provided **clear error messages** to improve debugging and user feedback.

---

## 📌 Milestone 4: Creating User Model and Controller

### 🚀 Key Features

#### ✅ **User Model**
- Created a Mongoose schema and model for users.
- Fields include `name`, `email`, `password`, and `role`.
- Implemented password hashing for security.
- Added timestamps for record tracking.

#### ✅ **User Controller**
- Developed controllers for user registration, login, and profile retrieval.
- Implemented JWT authentication for secure access.
- Included error handling and input validation.

#### ✅ **Multer Support**
- Integrated Multer for handling file uploads.
- Enabled user profile image uploads with storage configurations.
- Implemented middleware to process image uploads efficiently.

---

## 📌 Installation & Setup

Follow these steps to run the backend:

### **1️⃣ Install Dependencies**
Ensure you have Node.js installed, then run:
```sh
cd backend
npm install
```

### **2️⃣ Setup Environment Variables**
Create a `.env` file in the root directory and add:
```sh

MONGO_URI=mongo_url=mongodb+srv://<mahilmithranks2007>:<7sq1vEBWhnMvthUL>@cluster0.pwy6w.mongodb.net/kalvium-e_commerce?retryWrites=true&w=majority&appName=Cluster0
PORT=5000.
JWT_SECRET=your_secret_key
```

### **3️⃣ Run the Server**
```sh
npm start
```
The backend will run on `http://localhost:5000/`.

---

Ensure all changes are committed and pushed to your GitHub repository. Share the repository link as required.

