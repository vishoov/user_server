//database connect 
// client <----> server <-----> database 
const User = require('../models/user.model');
const comparePassword = require('../models/user.model');
const { generateToken } = require('../middleware/user.auth');


const register = async (req, res)=>{

    try{
        console.log("register called")
        //User.create -> create a new user in the database
        //req.body -> data from the client
        const user = await User.create(req.body);
        console.log(user);
    // const { username, email, password } = req.body;
    //writing a logic to save the user in database
    //javascript -> synchronous 
    //javascript error -> crash the server
    //asynchronouse javascript 
        //gives time to 3rd party (database) to do the work
        //it wont crash the server 
    // const user = await User.create({ username, email, password });;
    // console.log(username, email, password);


    // token -> jwt.sign -> user id -> secret key

    const token = generateToken(user);
    console.log(token);
    //generate token for the user
    //this will be send to the client as well
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
    
    //now this method has become useless 
    // if(user.password!==password){
    //     return res.status(400).send("Invalid password");
    // }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("Invalid password");


    const token = generateToken(user);
    console.log(token);
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
    res.status(500).send(err.message);
}
}

const profileRoute =  async (req, res) => {

    try{
    const { email }= req.body;
    //await
        const user = await User.findOne({email:email});
      
        const name = user.name;
        res.send(`Welcome ${name}, this is your profile ${user}`);
    
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