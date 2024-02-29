# Express Auth Middleware Package

This package provides middleware for authentication in Express applications using JWT (JSON Web Tokens). It simplifies the process of verifying tokens and handling user authentication.

## Installation

To install the package, use npm:

```bash
npm install express-auth-middleware



### Setting up Environment Variables

Create a `.env` file at the root directory of your project. 
Define the following environment variable:
JWT_SECRET=your_secret_key_here

import { authMiddleware } from "express-auth-middleware";

app.post("/verify", authMiddleware, (req, res) => {
  // Your route logic here
});

### Generating JWT Tokens

When generating JWT tokens using `jwt.sign()`, ensure the following:

-   The payload includes a property named  `user`  with any desired properties inside it can be an object or simply value as per convenience.
-   Use the environment variable `process.env.JWT_SECRET` as the secret key.

## Example:
const token = jwt.sign({ user }, process.env.JWT_SECRET, {
  expiresIn: Date.now() + 2 * 24 * 60 * 60 * 1000,
});

### Sending Tokens

When sending tokens, follow these conventions:

-   If sending cookies in headers, use the header `Authorization` with the token prefixed by `"Bearer "`.
-   If sending cookies as credentials, use the cookie named `access_token` while sending the cookie from the server to the client as shown below.

## Example:
res
  .status(200)
  .cookie("access_token", token, {
    httpOnly: true,
    expires: expiration time,
    // any other configuration
  })
  .json({ message: "Your message"});

### Handling Token Extraction

The middleware automatically extracts the token from the request headers or cookies or request body . If using cookies, ensure you have `cookie-parser` middleware set up in your Express app.

### Error Handling

The middleware handles unauthorized access and invalid tokens automatically. If the token is missing or invalid, it returns a 401 status with an appropriate error message.

## Dependencies

-   jsonwebtoken - For generating and verifying JWT tokens.
-   express - Core framework for building web applications in Node.js.
-   cookie-parser - For parsing cookies in Express applications.
