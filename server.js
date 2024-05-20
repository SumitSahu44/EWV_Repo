require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2001;
const routePath = require("./routes/user/userAllRoutes");

// Middleware to serve static files
app.use(express.static('./public'));


// // Middleware to parse JSON data
// app.use(express.json());
// // Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Route handling
app.use("", routePath);

// Set template engine
app.set('view engine', 'ejs');

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
