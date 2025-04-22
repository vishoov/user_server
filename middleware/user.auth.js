//JWT Middleware 


// -> public -> email and password -> token to be generate -> jwt.sign
// -> private -> jwt.verify -> token -> user id -> get user from database


//done by jwt, not our server



// methods -> jwt.sign and jwt.verify

const jwt = require("jsonwebtoken");



const auth = async (req, res, next)=>{
    try{
       const bearer = req.headers["authorization"];
        // console.log(bearer);

        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNhbXBsZUBzYW1wbGUuY29tIiwiaWF0IjoxNzQ1MzMzNzY3LCJleHAiOjE3NDU0MjAxNjd9.2o9fYAWgQ37Vkzu-3bDAtmJiOnkLNcF-DJh08uxICUc
        // Bearer token

        if(!bearer){
            return res.status(401).send("Unauthorized");
        }

        const token = bearer.split(" ")[1];

        // console.log(token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //bool answer -> True or false
        //user is authenticated -> True
        //user is not authenticated -> False
        if(!decoded){
            
            return res.status(401).send("Unauthorized");
        }

        console.log("Congratulations, you are authenticated");

        next();
        

      
    }
    catch(err){
        console.log(err);
    }
}

const generateToken = async (user)=>{
    try{
        //token generated here 
//server link -> jwt -> algorithm -> payload -> secret key -> options
        const token = jwt.sign(
            //algorithm -> HSC256

            { id: user.email }, //payload
            process.env.JWT_SECRET || "defaultSecretKey", //secret key
            {
                expiresIn: "1d",
                algorithm: "HS256",
                 //expires in 1 day
                //options 
            }
        );
  
        return token;
        //token is generated here

    }
    catch(err){
        console.log(err);
    }
}


module.exports = { auth, generateToken };