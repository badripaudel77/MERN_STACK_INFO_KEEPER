const  HttpError = require('../models/HttpError');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {

    try {
        // don't include password.  
        const user = await User.findById(req.user.userId).select('-password'); 
        res.json({user});

    } catch (error) {
        return res.status(500).json({message : "server error"})
    }
}

//for authentication like login for example
const userLogin = async (req, res, next) => {
   const { email, password } = req.body;
   if(!email || !password)  return res.status(500).json({message : "Fields can't be empty"})

       try { 
           const user = await User.findOne({email});
           if(!user) {
               return res.status(400).json({message : "User not found"})
           }
         
           const doesUserExist = await bcrypt.compare(password, user.password);
           if(!doesUserExist) 
           return res.status(400).json({message : "credentials didn't match with our records"})
        //    return next(new HttpError("credentials didn't match with our records", 400));
           
            token = jwt.sign({userId : user._id, email : user.email},
            process.env.token_secret,
           {expiresIn : '1h'});

           return res.status(200).json({token
               //_id : user._id, email : user.email, 
             });
       }
        catch (error) {
            return res.status(200).json({message : "Internal Error : Couldn't logged in"});
   }
}

//export modules
module.exports = {
    getUsers,
    userLogin
};