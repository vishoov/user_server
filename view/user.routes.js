const User = require("../models/user.model");
const { auth, generateToken } = require("../middleware/user.auth");

const router = require("express").Router();

const { register, login, profileRoute, all_users } = require("../controller/user.controllers");

//register
router.post("/register", register);




//login
router.post("/login",  login);


//profile
// get /profile -> welcome user, this is your profile 
//profile

router.get("/profile", auth, profileRoute)

// requet -> router handler -> secure (auth)-> callback function -> user info  


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


router.get("/find_age/:age", async (req, res)=>{
    try{
        const age = req.params.age;
        const data = await User.find({ age : age });
        res.send(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});


router.get("/greater_than/:age", async (req, res)=>{
    try{
        const age = req.params.age;

        const data = await User.find({ age : { $gte :age }});

        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

router.get("/age_range/:min/:max", async (req, res)=>{
    try{
        const min = parseInt(req.params.min);
        const max = parseInt(req.params.max);

        if(isNaN(min) || isNaN(max)){
            console.log("Invalid input");
        }
        // const data = await User.find({ age : { $gte :min, $lte:max }});
        const data = await User.find({ $and : [
            {
                age : { $gte : min}
            },{
                age : { $lte : max}
            }
        ]})

        res.status(200).json(data);
    
  
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
})

//find by name 
 router.get("/name/:name", async (req, res)=>{
    try{
        const name = req.params.name;
        const data = await User.find({ name : name });
        res.send(data);

    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});


router.get("/age_wise", async (req, res)=>{
    try{
        //age wise I want to group the data and get count of users of each age 
        
        const data = await User.aggregate([
            //stage 0-> match the data
            // {
            //     $match:{
            //         age : { $ne : 40 } //age is not null
            //     }
            // },
            // stage 1 -> group by age and get count of users of each age
            {
                $group:{
                    _id: "$age",
                    count : { $sum : 1 } 

                }
            },
            //stage 2 -> sort by age in ascending order
            {
                $sort:{
                    _id: 1 //_id -> age 
                    //1-> ascending order
                    //-1 -> descending order
                }
            },
            //stage 3 -> project the data and rename the fields
            {
                $project:{
                  
                    age: "$_id", //rename _id to age
                    _id:0, //remove _id field from the output
                    count: 1 //keep the count field as it is
                }
            }

        ])
        // .skip(0).limit(4);


        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});


router.get("/city_count/:page", async (req, res)=>{
    try{
        const page = parseInt(req.params.page);
        const limit = 2; //number of records per page
        const skip = (page - 1) * limit; //number of records to skip
        const users = await User.aggregate([
            {
                $group:{
                    _id:"$city",
                    count: { $sum : 1}
                }
            },
            {
                $sort:{
                    count: -1 //sort by count in descending order

                }
            },
            {
                $project:{
                    city: "$_id",
                    _id: 0,
                    count: 1
                }
            }
        ]).skip(skip).limit(limit);



        res.status(200).json(users);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
})


module.exports = router;