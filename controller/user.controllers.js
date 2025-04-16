//database connect 
// client <----> server <-----> database 
const User = require('../models/user.model');


const register = async (req, res)=>{

    try{
        console.log("register called")
        //User.create -> create a new user in the database
        //req.body -> data from the client
        const user = await User.create(req.body);
    // const { username, email, password } = req.body;
    //writing a logic to save the user in database
    //javascript -> synchronous 
    //javascript error -> crash the server
    //asynchronouse javascript 
        //gives time to 3rd party (database) to do the work
        //it wont crash the server 
    // const user = await User.create({ username, email, password });;
    // console.log(username, email, password);
    
    res.send(user);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

const login = async (req, res)=>{

    try{
    const { email, password } = req.body;

    const user = await User.findOne({ email:email});

    //error handle 
//if user not found
    if(!user){
        return res.status(400).send("User not found");
    }

    //then password auth
    
    if(user.password!==password){
        return res.status(400).send("Invalid password");
    }

    res.status(200).send(user);


    //email -> check if user exists in the database
    //search for the user in the database
    //due to time taken in searching in the database
    //our server might crash
    //asynchronous javascript 

    //const user = await User.find({ email });

}
catch(err){
    console.log(err);
    res.status(500).send("Internal server error");
}
}

const profileRoute =  async (req, res) => {

    try{
    const { email }= req.body;
    //await
        const user = await User.findOne({email:email});
        console.log(user)
        const name = user.name;
        res.send(`Welcome ${name}, this is your profile`);
    
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
}


const all_users = async (req, res) => {
    // const users = [ {name: "John", age: 25 }, { name: "Jane", age: 30 } ];
    const users = await User.find({});
    res.json(users);
    //res.json -> send json response
}

module.exports = {
    register,
    login,
    profileRoute,
    all_users
}