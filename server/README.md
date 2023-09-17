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

