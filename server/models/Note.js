const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({   
    
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },

    name : {
          type : String,
          trim : true,
          required : true
    },
    
    email : {
        type : String,
        trim : true,
        required : false,
    },

    phone : {
       type : String,
       trim : true,
       required : true
    },

    date : {
        type : Date,
        default : Date.now
    },

});

module.exports = mongoose.model('Note', NoteSchema); 