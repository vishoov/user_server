const express = require('express');

const app = express();

const userRoutes = require('./view/user.routes');

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use("/users", userRoutes);


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})