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

## Milestone 9: Product Input Form

### Overview

In this milestone, we created a product input form that allows users to enter product details and upload multiple images. The form ensures data validation and previews images before submission.

### Features

- User-friendly product input form
- Multiple image uploads with previews
- Real-time validation for form fields

### Installation & Usage

Clone the repository:
```sh
git clone YOUR_REPOSITORY_LINK
cd ecommerce-follow-along
```

---

## Milestone 10: Product Schema & API Endpoint

### Overview

In this milestone, we defined the product schema using Mongoose and created a POST API endpoint to validate and save product details in MongoDB.

### Learning Goals

By the end of this milestone, you will:

- Learn how to write a Mongoose schema for products.
- Implement data validation to ensure only valid data is saved.
- Create a POST API endpoint to receive and store product data in MongoDB.
- Understand the importance of data integrity and validation.

---

## Milestone 11: Product Listing Implementation

### Overview

In this milestone, we implemented the product listing functionality by creating a backend endpoint to fetch all products and displaying them dynamically in the frontend using components.

### Key Features

#### Backend Implementation
- Created a GET endpoint `/getAllProducts` to fetch all products from MongoDB
- Implemented proper error handling and success responses
- Structured the API response with product data including images, descriptions, and prices

#### Frontend Implementation
- Developed dynamic product fetching using React's `useState` and `useEffect` hooks
- Created a responsive grid layout using Tailwind CSS that adapts to different screen sizes
- Implemented loading states for better user experience
- Reused the ProductCard component to display product information consistently

#### Technical Details

- Backend endpoint returns product data in JSON format with success status
- Frontend makes asynchronous API calls to fetch product data
- Responsive grid layout with breakpoints:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Laptop: 3 columns
  - Desktop: 4 columns
  - Large Desktop: 5 columns

#### Learning Outcomes
- Understanding of frontend-backend data flow
- Implementation of dynamic data rendering in React
- Working with responsive grid layouts in Tailwind CSS
- Proper error handling in both frontend and backend

---

## Milestone 12: User-Specific Product Filtering

### Overview

In this milestone, we implemented user-specific product filtering functionality, allowing users to view only their own products in a dedicated "My Products" page.

### Key Features

#### Backend Implementation
- Created a new GET endpoint `/getUserProducts/:email` to filter products by user email
- Implemented proper error handling and validation
- Returns filtered products with success status

#### Frontend Implementation
- Enhanced the My Products page with dynamic product fetching
- Reused ProductCard component for consistent product display
- Added loading states and error handling for better UX
- Implemented responsive grid layout matching the main product page
- Integrated with user authentication using localStorage

#### Learning Goals
- Understanding data filtering with specific constraints
- Implementing protected routes and user-specific content
- Maintaining consistent UI/UX across different views

---

## Milestone 13: Product Update Functionality

### Overview

In this milestone, we implemented a comprehensive product update system that allows users to edit their existing products through a user-friendly interface.

### Key Features

#### Backend Implementation
- Created PUT endpoint `/updateProduct/:id` for updating product details
- Added validation to ensure users can only edit their own products
- Supports updating all product fields including multiple images
- Implements proper error handling and success responses

#### Frontend Implementation
- Created reusable `ProductForm` component for both adding and editing products
- Added edit button to product cards in My Products page
- Implemented `EditProduct` page with auto-filled form data
- Added real-time image preview functionality
- Integrated seamless navigation between viewing and editing products

#### Learning Goals
- Understanding CRUD operations in MongoDB
- Implementing secure product ownership validation
- Creating reusable form components
- Managing complex form state with image uploads

---

## Milestone 14: Product Delete Functionality

### Overview

In this milestone, we implemented a secure product deletion system that allows users to remove their products with a user-friendly confirmation flow.

### Key Features

#### Backend Implementation
- Created DELETE endpoint `/deleteProduct/:id` for removing products
- Added ownership validation to ensure secure deletions
- Implemented email-based authorization
- Added proper error handling and success responses

#### Frontend Implementation
- Enhanced ProductCard component with delete functionality
- Added confirmation dialog to prevent accidental deletions
- Implemented loading states during deletion
- Added error handling with user feedback
- Included automatic UI refresh after successful deletion

#### Learning Goals
- Understanding DELETE operations in MongoDB
- Implementing secure data deletion with ownership validation
- Creating user-friendly confirmation flows
- Managing UI states during asynchronous operations

---

## Milestone 15: Responsive Navigation System

### Overview

In this milestone, we implemented a modern, responsive navigation system that provides seamless access to all major sections of the application. The navigation system is designed to work flawlessly across all screen sizes, from mobile devices to desktop computers.

### Key Features

#### **Navigation Components**

- Modern, responsive Navbar component
- Mobile-friendly menu with hamburger toggle
- Smooth transitions and animations

#### **Navigation Links**

The navigation system includes links to all essential pages:
- Home - Main landing page
- My Products - View and manage products
- Add Product - Create new product listings
- Cart - Shopping cart and checkout

#### **Technical Implementation**

- Built using React and Tailwind CSS
- Responsive design using Tailwind's breakpoint system
- Client-side routing with React Router
- Component-based architecture for maintainability

### Usage

The navigation system is automatically included in all pages, providing consistent navigation throughout the application. The responsive design ensures:

- Desktop: Full horizontal navigation menu
- Mobile: Collapsible hamburger menu
- Tablet: Adaptive layout based on screen width

### Installation

```sh
git clone YOUR_REPOSITORY_LINK
cd ecommerce-follow-along
npm install
npm run dev
```

---

## Milestone 16: Product Details Page

### Overview

In this milestone, we implemented a comprehensive product details page that provides users with a rich, interactive view of product information, including an image gallery and detailed specifications.

### Key Features

#### Product Details Page
- Interactive image gallery with navigation controls
- Detailed product information display
  - Product name and price
  - Full description
  - Category and tags
  - Stock information
  - Seller details
- Responsive layout that adapts to all screen sizes
- Loading states and error handling

#### Enhanced Product Card
- Improved navigation to product details
- Made entire card clickable for better UX
- Optimized button layout and interactions

#### UI/UX Improvements
- Image gallery with previous/next navigation
- Image indicator dots for gallery navigation
- Clean and modern design using Tailwind CSS
- Consistent styling with the rest of the application

### Learning Goals
- Creating interactive image galleries
- Implementing dynamic routing with parameters
- Designing responsive layouts for detailed content
- Managing complex component state
- Enhancing user experience with loading states

---

## Milestone 17: Cart Functionality

- Implemented cart schema to store products with user reference
- Created POST endpoint `/add-to-cart` to add products to user's cart
- Supports adding new products and updating quantities of existing products
- Proper error handling and success responses

---

## Milestone 18: Cart Products Endpoint

- Added GET endpoint `/cart/:userId` to fetch user's cart products
- Returns product details including name, price and images
- Proper error handling for missing carts

---
