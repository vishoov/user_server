//database connect 
// client <----> server <-----> database 

const register = async (req, res)=>{

    try{
    const { username, email, password } = req.body;
    //writing a logic to save the user in database
    //javascript -> synchronous 
    //javascript error -> crash the server
    //asynchronouse javascript 
        //gives time to 3rd party (database) to do the work
        //it wont crash the server 
    // const user = await User.create({ username, email, password });;
    console.log(username, email, password);
    res.send("User registered successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const login = async (req, res)=>{

    try{
    const { email, password } = req.body;

    //email -> check if user exists in the database
    //search for the user in the database
    //due to time taken in searching in the database
    //our server might crash
    //asynchronous javascript 

    //const user = await User.find({ email });
    console.log(email, password);
    res.send("User logged in successfully");
}
catch(err){
    console.log(err);
    res.status(500).send("Internal server error");
}
}

const profileRoute =  async (req, res) => {

    try{
    const {username, email, password} = req.body;
    //await
    res.send(`Welcome ${username}, this is your profile`);
    
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
}


module.exports = {
    register,
    login,
    profileRoute
}