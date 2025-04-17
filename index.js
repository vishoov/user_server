const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv= require('dotenv');

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



const userRoutes = require('./view/user.routes');

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use("/users", userRoutes);


app.listen(PORT, ()=>{
    console.log('Server is running on port 3000');
});


