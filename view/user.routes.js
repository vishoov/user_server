
const router = require("express").Router();

const { register, login, profileRoute } = require("../controller/user.controllers");

//register
router.post("/register", register)


//login
router.post("/login", login)


//profile
// get /profile -> welcome user, this is your profile 
//profile

router.get("/profile", profileRoute)

//reset password
router.put("/reset-password", async (req, res)=>{    
    const { email, password, newpassword } = req.body;
    //await
    console.log(email, password, newpassword);
    res.send("Password reset successfully");

});


//logout
router.get("/logout/:name", (req,res)=>{

    let name = req.params.name;

    console.log(`Bye bye ${name}, see you again`)
    res.send(`Bye bye ${name}, see you again`);
})


// get all users 
router.get("/all_users", (req, res) => {
    const users = [ {name: "John", age: 25 }, { name: "Jane", age: 30 } ];
    res.json(users);
    //res.json -> send json response
});

module.exports = router;