// name, age, email, password 

//email -> phone number
//username -> email 
//Data Model -> Model / Blueprint -> Schema -> Object -> Document
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        //virat, rohit, sachin 
        //123 hashtag kumar 
        //arun kumar, ravi kumar, raj kumar
        required:true,
        //this field is required and without this field we cannot create a user
        trim:true,
        //remove spaces from the start and end of the string
    },
    age:{
        type:Number,
        required:false,
        min:18,
        //minimum age is 18
        max:100,
        //maximum age is 100
    },
    email:{
        type:String,
        required:false,
        unique:true,

        validate:{
            validator: function(input){
                //email validation logic 
                //regex for email validation
                //Regular Expression -> string -> pattern match
                //email validation regex
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                //regex for email validation
                return regex.test(input);
                //test method will return true or false

            }
        }
        //email validation
        //google@.com
        //google.com
        //google@com
        //google@com.
        //google@com.


    },
    password:{
        type:String,
        required:false,
        minLength:8,
        //minimum length of password is 8
        maxLength:20,
        //maximum length of password is 20
    },
    phone:{
        type:String,
        required:false,
        unique:true,
        validate:{
            validator: function(input){
                //phone validation logic 
                //regex for phone validation
                //Regular Expression -> string -> pattern match
                //phone validation regex
                const regex = /^\d{10}$/;
                //regex for phone validation
                return regex.test(input);
                //test method will return true or false

            }
        }
    },
    role:{
        type:String,
        enum:["admin", "user"],
        //enum: set of values that are allowed
        default:"user",
        //default value is user
        //if role is not provided then default value is user

    },
    city:{
        type:String,
        required:false,
        //this field is not required
    }
}, {
    timestamps:true,
    //createdAt and updatedAt fields will be created automatically
    //createdAt -> when the user is created
    //updatedAt -> when the user is updated
  
});

// PASSOWRD HASHING

//here i will encrypt the password using bcrypt
//encrypt the password before saving the user to the database
//algorithm, that will be chosen by bcrypt
//bcrypt will encrypt the password using the algorithm
//at the time of authentication we will compare the password with the encrypted password

// user will send data -> controller -> encrypting the password -> model -> database
userSchema.pre("save", async function(next){
    const user = this;
    //this will give the current user object
    const salt = await bcrypt.genSalt(10);
    //generate a salt with 10 rounds

    //salt is a random string that is used to encrypt the password
    //password + salt -> n times mix -> look different -> Hashed Password 

    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    //set the password to the hashed password

    next();

})
//.pre middleware executes before the save method is called 

//compare password method for login functionality
//this method will be used to compare the password with the hashed password
userSchema.methods.comparePassword = async function(password){
    const user = this;
    //current user -> this -> password, email, name, age

    const isMatch = await bcrypt.compare(password, user.password);
    //bcrypt.compare (plain password, hashed password)
    //fucntion name(args, args) 
    //compare the password with the hashed password
    //returns a bool value - T/F
    // $2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW
    // \__/\/ \____________________/\_____________________________/
    // Alg Cost      Salt                        Hash
    return isMatch;
    //if password is correct then return true

}

const User = mongoose.model("User", userSchema);

module.exports = User;