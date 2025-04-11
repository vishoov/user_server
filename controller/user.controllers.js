

const register =  (req, res)=>{
    const { username, email, password } = req.body;
    console.log(username, email, password);
    res.send("User registered successfully");
}

const login = (req, res)=>{
    const { email, password } = req.body;
    console.log(email, password);
    res.send("User logged in successfully");
}

module.exports = {
    register,
    login
}