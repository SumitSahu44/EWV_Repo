require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2001;
const routePath = require("./routes/user/userAllRoutes");
const cookieParser = require('cookie-parser')
const session = require('express-session');
const flash = require('express-flash');
 
// Middleware to serve static files
app.use(express.static('./public'));


// // Middleware to parse JSON data
// app.use(express.json());
// // Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
//  session config 
app.use(session({
    secret: process.env.json_secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24} // 24hr valid
  }))
  
app.use(flash());
// Route handling
app.use("", routePath);

// Set template engine
app.set('view engine', 'ejs');

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
