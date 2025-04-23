# E-commerce-follow-along

A powerful and scalable backend system for managing an e-commerce platform. Built with **Node.js**, **Express.js**, and **MongoDB**, this backend efficiently handles product management, user authentication, order processing, and payment integration.

---

## Features

- **User Management**:

  - User registration, login, and secure authentication using JWT.
  - Profile management and password updates.
  - Address management.

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

### Address Management

The application allows users to manage multiple addresses. Each address includes the following fields:

- Street address
- City
- State
- ZIP code
- Country

#### API Endpoints for Address Management

1. **Add New Address**

   - Endpoint: `POST /api/user/address`
   - Authentication: Required (JWT token)
   - Request Body:
     ```json
     {
       "street": "123 Main St",
       "city": "New York",
       "state": "NY",
       "zipCode": "10001",
       "country": "USA"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Address added successfully",
       "addresses": [
         {
           "street": "123 Main St",
           "city": "New York",
           "state": "NY",
           "zipCode": "10001",
           "country": "USA"
         }
       ]
     }
     ```

2. **Get User Profile (includes addresses)**
   - Endpoint: `GET /api/user/profile`
   - Authentication: Required (JWT token)
   - Response:
     ```json
     {
       "success": true,
       "user": {
         "id": "user_id",
         "name": "John Doe",
         "email": "john@example.com",
         "addresses": [
           {
             "street": "123 Main St",
             "city": "New York",
             "state": "NY",
             "zipCode": "10001",
             "country": "USA"
           }
         ]
       }
     }
     ```

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

## Milestone 19: Cart Functionality Implementation

### Overview

Implemented a complete shopping cart system with the ability to view cart items, update quantities, and remove products. The implementation includes both frontend and backend components with proper error handling and user feedback.

### Key Features

1. Cart Display

   - List of all products in the cart
   - Product images, names, and prices
   - Current quantity and stock information
   - Total price calculation

2. Quantity Management

   - Increase/decrease quantity with + and - buttons
   - Stock limit validation
   - Real-time updates
   - Loading states during updates

3. Cart Operations
   - Remove products from cart
   - Continue shopping option
   - Proceed to checkout button (placeholder)
   - Empty cart state handling

### Technical Implementation

#### Backend Endpoints

1. GET `/api/cart`

   - Retrieves all cart items for the logged-in user
   - Returns populated product details
   - Requires authentication

2. PUT `/api/cart/quantity`

   - Updates the quantity of a product in the cart
   - Validates stock availability
   - Requires productId and quantity in request body
   - Requires authentication

3. DELETE `/api/cart/:productId`
   - Removes a product from the cart
   - Requires productId in URL parameters
   - Requires authentication

#### Frontend Components

1. Cart Page (`Cart.jsx`)

   - Main cart view component
   - Handles cart state management
   - Calculates total price
   - Manages loading states

2. CartProduct Component
   - Individual product display in cart
   - Quantity controls
   - Remove button
   - Stock validation

### User Experience

- Clean and intuitive interface
- Real-time feedback for all actions
- Loading states during operations
- Error handling with toast notifications
- Responsive design for all screen sizes
- Clear empty cart state with call-to-action

### Error Handling

- Stock limit validation
- Network error handling
- Authentication error handling
- Invalid quantity handling
- User feedback through toast notifications

### Usage Instructions

1. View Cart

   - Navigate to the cart page
   - View all added products
   - Check total price

2. Update Quantity

   - Use + and - buttons to adjust quantity
   - System validates against available stock
   - Changes are saved automatically

3. Remove Products

   - Click the "Remove" button next to any product
   - Product is removed immediately
   - Cart updates automatically

4. Checkout
   - Click "Proceed to Checkout" to continue
   - Currently shows a placeholder message
   - Ready for future implementation

### Learning Goals

- State management in React
- API integration
- Error handling
- User feedback
- Loading states
- Form validation
- Responsive design

### Next Steps

1. Implement checkout functionality
2. Add order history
3. Implement payment integration
4. Add product recommendations
5. Implement cart persistence

---

## Milestone 20: Profile Page Implementation

### Overview

Implemented a comprehensive profile page that displays user information and manages delivery addresses. The implementation includes both frontend components and backend endpoints for a complete user profile management system.

### Key Features

#### Backend Implementation

- Created GET endpoint `/api/user/profile` to fetch user data
- Returns user details including:
  - Personal information (name, email)
  - Profile photo
  - List of saved addresses
- Proper error handling and authentication

#### Frontend Implementation

1. Profile Page Layout

   - Clean, modern design with two main sections
   - Responsive layout for all screen sizes
   - Loading states for better UX

2. Personal Information Section

   - Profile photo display
   - User name and email
   - Clean and organized layout

3. Addresses Section
   - List of saved addresses
   - "Add Address" button
   - Empty state handling
   - Address card layout with hover effects

### Technical Implementation

#### Backend Endpoint

```javascript
// GET /api/user/profile
{
    success: true,
    user: {
        id: "user_id",
        name: "John Doe",
        email: "john@example.com",
        photo: "photo_filename.jpg",
        addresses: [
            {
                street: "123 Main St",
                city: "New York",
                state: "NY",
                zipCode: "10001",
                country: "USA"
            }
        ]
    }
}
```

#### Frontend Components

1. Profile Page (`Profile.jsx`)

   - State management for user data
   - Loading state handling
   - Error handling with toast notifications
   - Navigation to address form

2. Navigation Integration
   - Added profile link to main navigation
   - Protected route access
   - Responsive mobile menu support

### User Experience

- Clean and intuitive interface
- Clear section separation
- Loading states during data fetch
- Error handling with user feedback
- Responsive design for all devices
- Clear empty state messaging

### Learning Goals

- Creating organized layouts
- Managing user data
- Implementing loading states
- Error handling
- Responsive design
- Component organization
- API integration

### Usage Instructions

1. View Profile

   - Navigate to the profile page
   - View personal information
   - Check saved addresses

2. Add Address

   - Click "Add Address" button
   - Fill in address details
   - Save the new address

3. View Addresses
   - Scroll to addresses section
   - View all saved addresses
   - Add new addresses as needed

### Next Steps

1. Add address editing functionality
2. Implement address deletion
3. Add profile photo upload
4. Add profile information editing
5. Implement address selection for orders

---

## Milestone 21: Address Form Frontend Implementation

### Overview

In this milestone, we created a user-friendly address form component that allows users to add new delivery addresses to their profile. The form includes validation, loading states, and proper error handling to ensure a smooth user experience.

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

### Key Features

#### Frontend Implementation

- Created a new `AddressForm` component with form validation
- Implemented state management using React hooks
- Added loading states for better UX
- Integrated with the backend API
- Added navigation between profile and address form
- Implemented error handling with toast notifications

#### Form Fields

The address form includes the following fields:

- Street Address
- City
- State
- ZIP Code
- Country

#### User Experience

- Clean and intuitive form layout
- Real-time form validation
- Loading states during submission
- Success/error notifications
- Cancel and submit buttons
- Responsive design for all screen sizes

### Technical Implementation

#### State Management

```javascript
const [formData, setFormData] = useState({
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
});
const [loading, setLoading] = useState(false);
```

#### Form Handling

```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await api.post("/api/user/address", formData);
    if (response.data.success) {
      toast.success("Address added successfully");
      navigate("/profile");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Error adding address");
  } finally {
    setLoading(false);
  }
};
```

### UI Components

- Form inputs with labels
- Loading state for submit button
- Cancel button to return to profile
- Success/error notifications
- Responsive layout using Tailwind CSS

### Integration Points

- Connected to backend API endpoint
- Integrated with React Router for navigation
- Uses toast notifications for feedback
- Maintains consistent styling with the rest of the application

### Learning Goals

- Creating reusable form components
- Managing form state in React
- Implementing form validation
- Handling API integration
- Managing loading states
- Providing user feedback
- Implementing responsive design

### Usage

The address form can be accessed from the profile page:

```javascript
// In Profile component
const navigate = useNavigate();
const handleAddAddress = () => {
  navigate("/add-address");
};
```

### Error Handling

- Form validation for required fields
- API error handling with user-friendly messages
- Loading states to prevent multiple submissions
- Network error handling

---

## Milestone 27: My Orders Page (Frontend Integration)

This milestone adds a **My Orders** page to the frontend of the e-commerce platform, allowing users to view their entire order history retrieved via the API created in Milestone 26.

### Objective

To provide users with an easy way to review all their past orders using a dedicated page connected to the backend via API.

### Features Implemented

- **My Orders Page**: A new page created using React that displays a list of all user orders.
- **API Integration**: Fetches orders using the `POST /api/orders/user` endpoint with the user's email and JWT token.
- **Detailed Order View**: Each order displays product info, quantity, delivery address, status, and timestamp.
- **Navbar Link**: Added a "My Orders" link to the main navigation bar for improved user accessibility.

---

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=6352
   MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run server
   ```
5. Start the frontend development server:
   ```bash
   npm run client
   ```

## Frontend Integration

To add a new address from the frontend, you can use the following code:

```javascript
const addAddress = async (addressData) => {
  try {
    const response = await api.post("/api/user/address", addressData);
    if (response.data.success) {
      // Handle success (e.g., show notification, update state)
      console.log("Address added successfully");
    }
  } catch (error) {
    // Handle error
    console.error("Error adding address:", error);
  }
};
```

## Error Handling

The API includes proper error handling for various scenarios:

- Missing required fields
- Invalid authentication
- Server errors
- Database errors

All errors are returned in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Security

- All address-related endpoints require authentication
- JWT tokens are used for authentication
- Input validation is performed on all address fields
- Passwords are hashed using bcrypt
- CORS is enabled for secure cross-origin requests

## Milestone 22: Create Address Endpoint.

### Overview

In this milestone, we implemented a comprehensive address management system that allows users to store and manage multiple delivery addresses. This feature is essential for e-commerce applications as it enables users to have different shipping addresses for their orders.

### Key Features

#### Backend Implementation

- Created new endpoint `/api/user/address` for adding new addresses
- Implemented address validation to ensure all required fields are provided
- Added address storage in the user's document using MongoDB's array structure
- Integrated with existing user authentication system
- Added proper error handling and success responses

#### Address Schema

Each address includes the following fields:

- Street address
- City
- State
- ZIP code
- Country

#### API Endpoints

1. **Add New Address**

   - Endpoint: `POST /api/user/address`
   - Authentication: Required (JWT token)
   - Request Body:
     ```json
     {
       "street": "123 Main St",
       "city": "New York",
       "state": "NY",
       "zipCode": "10001",
       "country": "USA"
     }
     ```

2. **Get User Profile (includes addresses)**
   - Endpoint: `GET /api/user/profile`
   - Authentication: Required (JWT token)
   - Returns user profile with all saved addresses

#### Security Features

- All address operations require authentication
- Input validation for all address fields
- Secure storage in MongoDB
- Protected routes with JWT verification

### Learning Goals

- Understanding MongoDB array operations
- Implementing secure data storage
- Creating reusable API endpoints
- Managing user-specific data
- Proper error handling and validation

### Technical Implementation

- Used MongoDB's `$push` operator for adding new addresses
- Implemented proper validation middleware
- Integrated with existing user authentication system
- Added comprehensive error handling
- Maintained consistent API response format

### Usage Example

```javascript
// Adding a new address
const addAddress = async (addressData) => {
  try {
    const response = await api.post("/api/user/address", addressData);
    if (response.data.success) {
      // Handle success
      console.log("Address added successfully");
    }
  } catch (error) {
    // Handle error
    console.error("Error adding address:", error);
  }
};
```

### Error Handling

The API includes proper error handling for various scenarios:

- Missing required fields
- Invalid authentication
- Server errors
- Database errors

All errors are returned in a consistent format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

# Milestone 23: Order Placement and Address Selection

This milestone introduces a key enhancement to the shopping experience by enabling users to place orders and select from their saved delivery addresses during checkout.

---

## Features Implemented

### 1. **Order Placement Flow**

- Added a `Place Order` button to the Cart page.
- Initiates the checkout process directly from the cart.

### 2. **Select Address Page**

- New interface allowing users to select a delivery address from their saved list.
- Designed for usability and quick navigation.

---

## Backend Integration

### Endpoint: `GET /api/user/addresses`

- **Description**: Retrieves all saved addresses for the authenticated user.
- **Authentication**: Required (JWT-based)
- **Response**:
  ```json
  {
    "addresses": [
      {
        "id": "address_1",
        "fullName": "John Doe",
        "street": "123 Main Street",
        "city": "Springfield",
        "state": "IL",
        "zipCode": "62701",
        "country": "USA"
      },
      ...
    ]
  }
  ```

---

## Milestone 24: Order Summary and Placement

### Features Implemented

1. **Display Ordered Products**
   - Show all products that the user is ordering.
2. **Display Delivery Address**
   - Show the address selected by the user for delivery.
3. **Display Total Cart Value**
   - Display the total value of the cart.
4. **Place Order Button**

   - Added a 'Place Order' button at the bottom of the page to finalize the order.

   # Milestone 25: Order Placement API

This milestone focuses on building a robust backend endpoint to handle complete order placements. It processes user details, address information, and individual product entries to create separate orders in the database.

---

## Overview

- Created a POST endpoint to **place orders** with products, user details, and address.
- Retrieves the user’s `_id` using their email.
- Stores **each product as a separate order** with the same shipping address.
- Utilizes the existing `Order` schema for MongoDB integration.

---

## Endpoint Details

### POST `/api/orders/place`

#### Authentication

- Requires user to be logged in (JWT token).

#### Request Body

````json
{
  "email": "user@example.com",
  "address": {
    "fullName": "John Doe",
    "street": "123 Main Street",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62701",
    "country": "USA"
  },
  "products": [
    {
      "productId": "product_1",
      "quantity": 2
    },
    {
      "productId": "product_2",
      "quantity": 1
    }
  ]
}




---

##  Milestone 26: User Order History API

This milestone implements a robust API endpoint for retrieving a user's complete order history, enhancing the account management capabilities.

###  Key Features

- **Secure Order Retrieval**: Fetch all orders associated with authenticated users
- **Email-based Identification**: Efficiently query orders using user email
- **Comprehensive Order Details**: Returns product, address, status, and timestamps
- **JWT Authentication**: Ensures access is restricted to logged-in users

###  API Specification

#### Endpoint
`POST /api/orders/user`

#### Headers
- `Authorization: Bearer <token>`

#### Request Body
```json
{
  "email": "user@example.com"
}
{
  "orders": [
    {
      "_id": "order_id_1",
      "user": "user_id",
      "product": {
        "productId": "product_1",
        "name": "Product Name"
      },
      "quantity": 1,
      "address": {
        "fullName": "John Doe",
        "city": "Springfield",
        "state": "IL"
      },
      "status": "Processing",
      "createdAt": "2025-04-23T12:00:00Z"
    }
  ]
}
## Milestone 27: My Orders Page (Frontend Integration)

This milestone adds a **My Orders** page to the frontend of the e-commerce platform, allowing users to view their entire order history retrieved via the API created in Milestone 26.

---

###  Objective

To provide users with an easy way to review all their past orders using a dedicated page connected to the backend via API.

---

###  Features Implemented

- **My Orders Page**: A new page created using React that displays a list of all user orders.
- **API Integration**: Fetches orders using the `POST /api/orders/user` endpoint with the user's email and JWT token.
- **Detailed Order View**: Each order displays product info, quantity, delivery address, status, and timestamp.
- **Navbar Link**: Added a "My Orders" link to the main navigation bar for improved user accessibility.

---

###  API Call Sample

```js
const response = await axios.post('/api/orders/user', {
  email: user.email
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
````
##  Milestone 28: Cancel Order Feature

In this milestone, we enhance the **My Orders** page by adding a **Cancel Order** button to each order. If an order is already canceled, the button will not appear. Additionally, a backend API endpoint is implemented to handle the cancellation of orders.

---

###  Objective

- Add a **Cancel Order** button to each order in the **My Orders** page.
- Ensure the button is only visible if the order status is not already "Canceled."
- Create a backend endpoint that marks an order as canceled when requested.

---

###  Features Implemented

- **Cancel Order Button**: A button is added to each order on the **My Orders** page, allowing users to cancel their orders.
- **Conditional Button Display**: The cancel button is hidden if the order status is already "Canceled."
- **Backend Endpoint**: Created a `POST /api/orders/cancel` endpoint that accepts an order ID, retrieves the order, updates its status to "Canceled," and saves the changes to the database.

---

###  API Specification

#### Endpoint
`POST /api/orders/cancel`

#### Request Format
```json
{
  "orderId": "order_id_123"
}

##  Milestone 28: Cancel Order Feature

In this milestone, we enhance the **My Orders** page by adding a **Cancel Order** button to each order. If an order is already canceled, the button will not appear. Additionally, a backend API endpoint is implemented to handle the cancellation of orders.

---

###  Objective

- Add a **Cancel Order** button to each order in the **My Orders** page.
- Ensure the button is only visible if the order status is not already "Canceled."
- Create a backend endpoint that marks an order as canceled when requested.

---

###  Features Implemented

- **Cancel Order Button**: A button is added to each order on the **My Orders** page, allowing users to cancel their orders.
- **Conditional Button Display**: The cancel button is hidden if the order status is already "Canceled."
- **Backend Endpoint**: Created a `POST /api/orders/cancel` endpoint that accepts an order ID, retrieves the order, updates its status to "Canceled," and saves the changes to the database.

---

###  API Specification

#### Endpoint
`POST /api/orders/cancel`

#### Request Format
```json
{
  "orderId": "order_id_123"
}
{
  "message": "Order successfully canceled."
}
##  Milestone 30: Online Payment Integration with PayPal

This milestone implements **PayPal online payment integration** for the e-commerce platform, enabling users to make secure payments via PayPal and other payment methods like credit and debit cards.

---

###  Objective

- Integrate PayPal as a payment method in the e-commerce checkout flow.
- Use the **PayPal API** with the client key created in the PayPal sandbox account to enable online payments.
- Use the **react-paypal-js** package to display PayPal and card payment options on the frontend.

---

###  Features Implemented

- **PayPal Integration**: Enabled PayPal checkout functionality on the frontend.
- **react-paypal-js**: Utilized the `PayPalScriptProvider` component to display PayPal's payment methods (credit/debit cards).
- **Sandbox Mode**: Integrated PayPal's sandbox environment for testing payment functionality.
- **Secure Payment Flow**: Payment handling, including success and failure callbacks, to properly manage order completion and payment verification.

---

###  Steps for Implementation

#### 1. **Set Up PayPal Developer Account**
- Create a PayPal developer account if you haven't already.
- Obtain your **Client ID** from PayPal’s sandbox account. This will be used for API calls to handle payment.

#### 2. **Install `react-paypal-js` Package**
   Run the following command to install the `react-paypal-js` package:
   
   ```bash
   npm install @paypal/react-paypal-js

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from './Checkout'; // Your checkout component

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
      <Checkout />
    </PayPalScriptProvider>
  );
}

export default App;


import { PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  return (
    <div>
      <h2>Complete Your Purchase</h2>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '100.00',  // Amount for the payment
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            alert("Payment completed by " + details.payer.name.given_name);
            // Handle successful payment (e.g., update order status, redirect)
          });
        }}
        onError={(err) => {
          console.error("Payment Error", err);
          // Handle payment failure
        }}
      />
    </div>
  );
}

export default Checkout;

##  Milestone 31: Implementing Redux for Global State Management

This milestone integrates **Redux** into the React application to manage the global state for the user's email address. Redux helps to maintain the email state globally, making it accessible across all components within the app.

---

###  Objective

- Integrate Redux into the application.
- Store the user's email in the global state and make it accessible across the app.
- Set up the Redux store, actions, and reducers to handle email management.

---

###  Features Implemented

- **react-redux Integration**: Installed the `react-redux` package to connect Redux with the React application.
- **Global State Management**: Stored the user's email address in the global state.
- **User Actions**: Created an action to set and update the user's email in the global state.
- **Store Setup**: Configured the Redux store with the userReducer to handle the email state.

---

###  Steps for Implementation

#### 1. **Install `react-redux` and `redux` Packages**
   Install the required packages to integrate Redux into your React app:

   ```bash
   npm install react-redux redux

// store/store.js
import { createStore } from 'redux';
import userReducer from './userReducer';

const store = createStore(userReducer);

export default store;

// store/userActions.js
export const setEmail = (email) => {
  return {
    type: 'SET_EMAIL',
    payload: email,
  };
};
// store/userReducer.js
const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default userReducer;
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';  // Path to your store.js
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
##  Milestone 32: Using Redux for Global State in Login Page

This milestone focuses on using **Redux** to manage the user's email across different pages. The user's email is stored in the global state on the **Login page**, and other pages can access the email using the **`useSelector`** hook.

---

###  Objective

- Store the user's email in the global state upon successful login using Redux's `dispatch` method.
- Access the stored email across different pages using the `useSelector` hook to manage global state more effectively.

---

###  Features Implemented

- **Dispatch Email on Login**: On the Login page, the user's email is dispatched to the global state using Redux.
- **Global State Access**: Other pages can access the user's email using the `useSelector` hook, making the email available across the app.
- **Redux for Authentication**: Used Redux to manage authentication state for the user.

---

###  Steps for Implementation

#### 1. **Dispatch Email on Successful Login**

In the `Login` component, after the user successfully logs in, dispatch the email to the global Redux state:

```js
// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEmail } from '../store/userActions';  // Path to your userActions.js

const Login = () => {
  const [email, setEmailInput] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Dispatch the email to Redux store
    dispatch(setEmail(email));

    // Redirect to home or dashboard page (optional)
  };

  return (
    <div>
      <h2>Login</h2
// src/pages/Home.js
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const userEmail = useSelector((state) => state.email);  // Access email from Redux store

  return (
    <div>
      <h2>Welcome, {userEmail ? userEmail : 'Guest'}!</h2>
    </div>
  );
};

export default Home;
// store/userActions.js
export const setEmail = (email) => {
  return {
    type: 'SET_EMAIL',
    payload: email,
  };
};
// store/userReducer.js
const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default userReducer;
