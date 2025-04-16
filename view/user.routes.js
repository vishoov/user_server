const User = require("../models/user.model");


const router = require("express").Router();

const { register, login, profileRoute, all_users } = require("../controller/user.controllers");

//register
router.post("/register", register)


//login
router.post("/login", login)


//profile
// get /profile -> welcome user, this is your profile 
//profile

router.get("/profile", profileRoute)

//reset password
router.put("/reset-password/:id", async (req, res)=>{    
    const { email, password, newpassword } = req.body;
    //await
    // const user = await User.findOne({email:email})
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(
        id,
        { password: newpassword },
        { new: true } //returns the updated user object
    )
    
    res.status(200).send(user);

});


//logout
router.get("/logout/:name", (req,res)=>{

    let name = req.params.name;

    console.log(`Bye bye ${name}, see you again`)
    res.send(`Bye bye ${name}, see you again`);
})


// get all users 
router.get("/all_users", all_users);

module.exports = router;