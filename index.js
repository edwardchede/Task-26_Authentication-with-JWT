

// Import Express
const express = require('express')
const app = express()
const PORT = 8000
const jwt = require('jsonwebtoken')


// Enable JSON parsing for incoming request bodies
app.use(express.json())
// User login route
app.post('/login', (req, res) => {
// Extracting username and password from the request body
const username = req.body.username
const password = req.body.password
// For now, we'll just respond with the received username and password


if (username === 'edwardchede' && password === 'password') {
    // User payload for JWT
    const payload = {
    name: username,
    admin: true
    }
    // Generate the JWT
    const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' })
    // Send the token in the response
    res.send({ token })
    } else {
    res.status(403).send({ error: 'Incorrect login!' })
    }
    

// res.send(`Username: ${username}\nPassword: ${password}`)

})

// Route to access a general resource, requiring a valid JWT for authentication
app.get('/resource', (req, res) => {
// Extract the token from the authorisation header
const authHeader = req.headers['authorization'];
let token;
// Check if the authorisation header includes the “Bearer” prefix
if (authHeader && authHeader.startsWith('Bearer ')) {
// If it does, split to extract the token part after “Bearer”
token = authHeader.split(' ')[1];
} else {
// If no Bearer prefix, assume the entire header is the token
token = authHeader;
}
// If no token is found, respond with a “401 Unauthorized” error
if (!token) {
return res.status(401).send({ error: 'Token missing!' });
}
try {
// Verify the JWT using the secret key
const decoded = jwt.verify(token, 'jwt-secret');
// If verification succeeds, send a personalised message
res.send({
message: `Hello, ${decoded.name}! Your JSON Web Token has been
verified.`
});
} catch (err) {
// If verification fails, respond with a “401 Unauthorized” error
res.status(401).send({ error: 'Invalid JWT!' });
}
});


// Route to access an admin-only resource, requiring a valid JWT with admin privileges
app.get('/admin_resource', (req, res) => {
// Extract the token from the authorisation header
const authHeader = req.headers['authorization'];
let token;
// Check if the authorisation header includes the “Bearer” prefix
if (authHeader && authHeader.startsWith('Bearer ')) {
// If it does, split to extract the token part after “Bearer”
token = authHeader.split(' ')[1];
} else {
// If no Bearer prefix, assume the entire header is the token
token = authHeader;
}
// If no token is found, respond with a “401 Unauthorized” error
if (!token) {
    return res.status(401).send({ error: 'Token missing!' });
}
try {
// Verify the JWT using the secret key
const decoded = jwt.verify(token, 'jwt-secret');
// Check if the decoded token has admin privileges
if (decoded.admin) {
// If admin privileges are present, respond with a success message
res.send({ message: 'Welcome, admin! Access granted.' });
} else {
// If the user is not an admin, respond with a 403 Forbidden error
res.status(403).send({
message: 'Access denied: your JWT is verified, but you lack admin privileges.'
});
}
} catch (err) {
// If verification fails, respond with a “401 Unauthorized” error
res.status(401).send({ error: 'Invalid JWT!' });
}
});


// Start the server
app.listen(PORT, () => console.log(
`Server is running at http://localhost:${PORT}`
))



