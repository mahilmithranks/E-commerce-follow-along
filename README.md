# E-commerce-follow-along

A powerful and scalable backend system for managing an e-commerce platform. Built with **Node.js**, **Express.js**, and **MongoDB**, this backend efficiently handles product management, user authentication, order processing, and payment integration.

---

## Features

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

## Tech Stack

- **Frontend Framework**: React.js
- **Backend Framework**: Node.js + Express.js
- **Database**: MongoDB

---

## Milestone 2: Frontend Setup

A simple React.js project styled with Tailwind CSS and using React Router DOM for navigation. This project demonstrates a minimal UI with a centered "Welcome to Home" text and basic routing.

### Features

- **React.js Frontend**: Fast and efficient component-based development.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **React Router DOM**: Enables client-side routing and navigation.
- **Minimalist UI**: A clean and simple layout with centered content.
- **Fully Responsive**: Optimized for different screen sizes.

### Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Build Tool**: Vite (Optional, if used)

---

## Milestone 3: Backend Setup & Folder Structure

In this milestone, we focused on structuring the backend, setting up the server, connecting to MongoDB, and implementing basic error handling.

### Key Features

#### **Backend Folder Structure**

A well-organized backend directory following MVC (Model-View-Controller) architecture.

#### **Server Setup**

- Configured a backend server using **Node.js** and **Express.js**.
- Implemented a **REST API** with Express routes.
- Server listens on a designated port and handles requests efficiently.

#### **MongoDB Integration**

- Connected the backend to **MongoDB** using Mongoose.
- Established a **database connection** to handle product and user data.
- Created Mongoose models for structured data storage.

#### **Error Handling**

- Implemented a centralized error-handling system in `utils/errorHandler.js`.
- Provided **clear error messages** to improve debugging and user feedback.

---

## Milestone 4: Creating User Model and Controller

### Key Features

#### **User Model**

- Created a Mongoose schema and model for users.
- Fields include `name`, `email`, `password`, and `role`.
- Implemented password hashing for security.
- Added timestamps for record tracking.

#### **User Controller**

- Developed controllers for user registration, login, and profile retrieval.
- Implemented JWT authentication for secure access.
- Included error handling and input validation.

#### **Multer Support**

- Integrated Multer for handling file uploads.
- Enabled user profile image uploads with storage configurations.
- Implemented middleware to process image uploads efficiently.

---

## Milestone 5: Frontend Development - User Registration

### Key Accomplishments:

- Designed the frontend UI for user registration.
- Implemented input validation for fields like email and password to ensure data integrity.
- Documented progress and updates in the README file.

### The Sign-Up Page:

The Sign-Up Page allows users to enter their details to create an account. This page includes essential input fields such as:

- Name
- Email
- Password

Users provide their information, which is then submitted to the server for processing. The goal was to create a simple, clean, and user-friendly sign-up form that enhances the registration experience.

### Steps for Milestone 5:

In this milestone, we focused on frontend development with guidance from a mentor, covering:

- Building the Sign-Up Page using HTML, CSS, and JavaScript.
- Adding form validation to ensure users input valid data before submission.
- Enhancing user experience with clear error messages and input feedback.

---

## Milestone 6: Secure User Authentication

### Key Features:

#### **Encrypt the Password:**

- Used `bcrypt` to hash the user's password during signup.
- Saved the hashed password in the database instead of plain text.

#### **Store Complete User Data:**

- Saved all user details (e.g., name, email, etc.) in the database.
- Ensured the password remains encrypted for security.

---

## Milestone 7: Backend Endpoint for User Login

### Learning Goals

By the end of this milestone, you will:

- Understand how to validate user credentials during login.
- Learn how to compare the encrypted password with the user’s input.

### Why Encrypt Passwords?

- **Protect User Data**: Keeps passwords safe even if the database is compromised.
- **Privacy**: Ensures passwords aren’t stored in plain text.
- **Compliance**: Meets security standards like GDPR and PCI-DSS.
- **Prevents Password Theft**: Hashed passwords are difficult to decipher, increasing security.

### How Login Authentication Works

1. **User Enters Credentials**:

   - The user provides their email/username and password on the login page.

2. **Fetch User Data from Database**:

   - The backend retrieves the user record based on the provided email/username.
   - If the user is not found, return an error: "User does not exist."

3. **Compare Encrypted Passwords**:

   - Process the user's input password using the same hashing algorithm (e.g., bcrypt).
   - Compare the resulting hash to the stored hashed password.
   - If they match, the user is authenticated; if not, send an error.

---

## Milestone 8: Creating and Displaying Card Components

### Learning Goals

By the end of this milestone, you will:

- Learn how to create a card component.
- Learn how to display those cards on the products page.

### Why Create Card Components?

- **Showcase Products Effectively**: Presents product details in a clear and visually appealing way.
- **Reusable Design**: Can be used across multiple pages or sections of the app.
- **Improved User Experience**: Makes it easy for users to browse and interact with products.
- **Organized Layout**: Keeps the homepage clean and structured.

### How to Display a Single Card for Multiple Products?

- **Create a Dynamic Component**: Design a single card component that accepts product details as props.
- **Use Mapping**: Use array mapping to iterate over the product list and render a card for each product.
- **Pass Data Dynamically**: Pass unique product information (e.g., name, price, image) to each card.
- **Maintain Consistency**: Ensure the layout remains uniform for all products.

