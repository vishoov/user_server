const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const mongoose = require('mongoose');
const dotenv= require('dotenv');
const cors = require('cors');

dotenv.config();
//dotenv is used to load environment variables from .env file

//database connection string for local mongodb
const DB= process.env.MONGO;
const PORT = process.env.PORT || 3000;
const local = process.env.LocalDB;

//mongoose is the database driver which will help us in connection
// our server to the database
mongoose.connect(local)
.then(console.log('Connected to MongoDB'))
.catch((err)=> { console.log(err);});


// Allowed origins array (customize as needed)
const allowedOrigins = [
    'http://localhost:3000',
    //whatever ip address we will allow, only that will be served 
    '146.196.32.45/32',
    'http://example.com',
];
  
  // Custom CORS middleware with error handling
  function corsMiddleware(req, res, next) {
    const origin = req.headers.origin;
    // allowedOrigins.includes(origin)
    // const allowed = allowedOrigins.includes(origin);
    const allowed = true;``
    if (allowed) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
  
      // Handle preflight OPTIONS request
      if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
      }
  
      next();
    } else {
      // Custom error for disallowed origins
      const err = new Error('CORS Error: This origin is not allowed');
      err.status = 403;
      next(err);
    }
  }

  

  app.use(corsMiddleware);
  
  // ... your routes here


const userRoutes = require('./view/user.routes');

app.use(express.json());

const limiter = rateLimit({
    //till how long and how many requests we can send to the server
    //after that we will get an error
    windowMs: 720 * 60 * 1000, // 12 hours in milliseconds
    //for how long do i have to wait to send the next request
    maxRequests: 1000, // limit each IP to 100 requests per windowMs


});

app.use(limiter);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use("/users", userRoutes);


app.listen(PORT, ()=>{
    console.log('Server is running on port 3000');
});


