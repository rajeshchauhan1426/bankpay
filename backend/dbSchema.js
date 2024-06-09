const mongoose = require("mongoose");




mongoose.connect("mongodb://localhost:27017/paytm ")




const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        trim:true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },

    password: {
        type:String,
        required: true,
        minlength: 6
    },
    
    firstname:{
        type: String,
        required: true,
        trim : true,
        maxLength: 50
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
        maxLength:50
    },
    email:{
        type: String,
        required: true,
        trim:true,
        maxLength: 50
 
    }



});


const User = mongoose.model('User' , userSchema);

module.export = {
    User
}