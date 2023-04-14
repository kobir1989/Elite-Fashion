# Elite-Fashion Client

This project is a web-based eCommerce platform built using MARN Stack. The purpose of this project is to showcase my skills as a full-stack developer and demonstrate my ability to build complex web applications.

## Overview

### This eCommerce platform offers users the convenience of browsing and purchasing fashion products online. Its key features include:

- Product listings: users can view a list of available products and filter them by category, price, or other attributes.
- Shopping cart: users can add products to their cart, view their cart, and adjust the quantity of items in their cart.
- Checkout process: users can complete the checkout process by providing their billing and shipping information, selecting a payment method, and confirming their order.
- User authentication: users can create an account, log in, and view their order history.
- User-Admin Chat: Users can interact with the Admin through a chat feature.
- Product reviews and ratings: Users can write product reviews and give ratings for items they've purchased.
- Wishlist: Users can add products to their wishlist for future reference.
- User profile page: A dedicated user profile page where users can see their wishlist and order history, and even upload a profile picture.
- Email confirmation: After completing a purchase, users receive an email confirmation for their records.
- An admin [Dashboard](https://elite-fashion-admin.vercel.app/) application is already running on the same server. 

## Installation

### To install and run this project locally, follow these steps:

1. Clone the project repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Run `npm install` to install the project dependencies.
4. Run `npm start` to start the development server and view the project in your browser.

## Technologies and External Libraries Used

### The eCommerce platform was developed using the following technologies and external libraries:

- React: a JavaScript library for building user interfaces.
- Redux Toolkit: A predictable state container for JavaScript applications.
- React Router: a library for handling client-side routing in React applications.
- Axios: a library for making HTTP requests from the browser.
- Material-UI (MUI): A front-end framework for building responsive web applications.
- SCSS: A CSS preprocessor that enhances the capabilities of CSS.
- jwt-decode: A library for decoding JSON Web Tokens (JWTs).
- react-dropzone: A simple and flexible React component for file uploads.
- framer-motion: A library for creating fluid animations in React applications.
- react-slick: A carousel component for React applications.
- react-hot-toast: A lightweight toast notification library for React.
- stripe: a payment processing platform used for handling payments.


## Contributing

### Contributions to this project are welcome. To contribute, follow the steps below:
- Fork the project repository to your own GitHub account.
- Clone the forked repository to your local machine.
- Create a new branch for your changes.
- Make your changes to the project code.
- Commit your changes and push them to your forked repository.
- Open a pull request on the original project repository. 


# Elite-Fashion Server

## Overview
### The server for this eCommerce platform is built using Node.js and Express. It provides a RESTful API that is consumed by the client-side application to handle various server-side functionalities such as user authentication, product listings, and order management.

## API Endpoints Auth
- POST /api/v1/auth/signup - This endpoint is used to register a new user account.
- POST /api/v1/auth/signup - This endpoint is used to register a new user account.
- GET /api/v1/auth/logout  - This endpoint is used to log out the authenticated user.
- POST /api/v1/auth/reset/password/:resetToken  - This endpoint is used to reset a user's password with a reset token.
- GET /api/v1/auth/forget/password  - This endpoint is used to initiate the forget password process.
- POST /admin/login: login admin  - This endpoint is used for admin login.

## API Endpoints User 
- PUT /api/v1/user/update/profile/:userId - This endpoint is used to update a user's profile with a user ID.
- PUT /api/v1/admin/update/profile/:adminId  - This endpoint is used to update an admin's profile with an admin ID.
- GET /api/v1//user/profile/:userId  - This endpoint is used to get a user's profile with a user ID.
- GET /api/v1/user/all/profile   - This endpoint is used to get all the user profiles.

## API Endpoints Products
- GET /api/v1/:subCategoryId/products  - This endpoint is used to get all products within a subcategory with a subcategory ID.
- GET /api/v1/product/single/:productId  - This endpoint is used to get a single product with a product ID.
- GET /api/v1/product/best-selling - This endpoint is used to get the best selling products.
- GET /api/v1/products/all   -  This endpoint is used to get all the products.
- POST /api/v1/create/product  - This endpoint is used to create a new product.
- PUT /api/v1/product/edit/:productId   - This endpoint is used to edit a product with a product ID.
- DELETE /api/v1/product/delete/:productId  - This endpoint is used to delete a product with a product ID.

## API Endppoints Categories
- GET /api/v1/categories/all  - This endpoint is used to get all the categories.
- GET /api/v1/category/single/:categoryId  -  This endpoint is used to get a single category with a category ID.
- POST /api/v1/category/create  -  This endpoint is used to create a new category.
- PUT /api/v1/category/edit/:categoryId   -  This endpoint is used to edit a category with a category ID.
- DELETE /api/v1/category/remove/:categoryId  - This endpoint is used to remove a category with a category ID.

## API Endpoints Sub-Categories
- GET /api/v1/sub-category/:categoryId  - This endpoint is used to get all the subcategories within a category with a category ID.
- GET /api/v1/sub-category/list/all   -  This endpoint is used to get all the subcategories.
- POST /api/v1/sub-category/create/new   -  This endpoint is used to create a new subcategory.
- PUT /api/v1/sub-category/edit/:subCategoryId  -  This endpoint is used to edit a subcategory with a subcategory ID.
- DELETE /api/v1/sub-category/remove/:subCategoryId   - This endpoint is used to remove a subcategory with a subcategory ID.

## API Endpoints Payment STRIPE 
- POST /api/v1/create-payment-intent  -  - This endpoint is used to create a payment intent for the stripe payment gateway.

## API Endpoints Search 
- GET /api/v1/search/:key   - This endpoint is used to search for products based on a keyword.

## API Endpoints Reviews 
- GET /api/v1/reviews/product/:productId  - This endpoint is used to get all the reviews for a product with a product ID.
- GET /api/v1/reviews/all   -  Gets all reviews for all products.
- GET /api/v1/review/details/:reviewId    - Gets the details of a single review.
- POST /api/v1/review/create  -  Creates a new review.
- DELETE /api/v1/review/delete/:reviewId   - Deletes a review.

## API Endpoints Admin Analytics Data
- GET /api/v1/admin/analytics   - Gets analytics data for the admin dashboard.


## Authentication


 This server uses JSON Web Tokens (JWT) for user authentication. When a user logs in, the server returns a JWT token that the client-side application stores in local storage. This token is then included in the header of subsequent requests to authenticated endpoints.

## External Libraries Used
### This server relies on the following external libraries:

- Express: a web framework for Node.js.
- Mongoose: an object modeling tool for MongoDB.
- bcrypt: a library for password hashing.
- jsonwebtoken: a library for generating and verifying JSON Web Tokens.
- nodemailer: a library for sending emails.
- dotenv: a library for managing environment variables.
- cloudinary: a cloud-based image management platform.
- express-fileupload: a middleware for handling file uploads in Express.
- googleapis: a library for interacting with various Google APIs, used for sending emails.
- stripe: a payment processing platform used for handling payments.

## Future Development
### In the future, i have plan to add the following features to the server:

- OAuth2 authentication: adding support for authentication using third-party providers such as Google and Facebook.
- WebSockets: adding support for real-time updates and notifications.
- Improved error handling: implementing better error handling and logging capabilities to improve server-side troubleshooting.

