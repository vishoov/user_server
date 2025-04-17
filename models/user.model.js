// name, age, email, password 

//email -> phone number
//username -> email 
//Data Model -> Model / Blueprint -> Schema -> Object -> Document
const mongoose = require("mongoose");

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


const User = mongoose.model("User", userSchema);

module.exports = User;