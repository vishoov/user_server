const express = require('express');

const app = express();
const mongoose = require('mongoose');

const dbURI = "mongodb://localhost:27017/fresh";
//database connection string for local mongodb



//mongoose is the database driver which will help us in connection
// our server to the database
mongoose.connect(dbURI)
.then(console.log('Connected to MongoDB'))
.catch((err)=> { console.log(err);});



const userRoutes = require('./view/user.routes');

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use("/users", userRoutes);


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});


