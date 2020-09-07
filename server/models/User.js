const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({   
    
    name : {
          type : String,
          trim : true,
          required : true
    },

    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 5
   },

    date : {
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model('User', UserSchema); 