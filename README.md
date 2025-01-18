## JWT Authentication Server

## Table of Contents
1. Description
2. Learning Objectives
3. Installation
4. Usage
5. Credits

## Description
This project demonstrates how to implement authentication and authorization using **JSON Web Tokens (JWT)** in a Node.js application. The server allows:
- User login to receive a JWT.
- Access to general resources requiring valid JWTs.
- Admin-only resources requiring JWTs with admin privileges.
This coding task helps learners understand **token-based authentication**, which is widely used in modern web applications.

## Learning Objectives
By completing this project, you will learn:
- How to create and verify JWTs using the `jsonwebtoken` library.
- How to build protected routes with varying access levels (e.g., user vs. admin).
- The importance of secure authorization in web development.

## Installation
To run this project locally, follow these steps:
Install the required dependencies using ‘npm install‘
Start the server using ‘npm start‘ The server will start on http://localhost:8000.

## Usage 
Use  Postman to test the endpoints:
POST /login: Send a username and password to receive a JWT.
GET /resource: Access a general resource with a valid JWT.
GET /admin_resource: Access an admin-only resource with a valid JWT.
Use the token in the Authorization header as Bearer <token> to access the protected routes.
## Credits
This project was implemented by Edward Chede. All code and documentation are authored by me
