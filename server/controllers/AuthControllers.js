const  HttpError = require('../models/HttpError');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {

    try {
        // don't include password.  
        const user = await User.findById(req.user.userId).select('-password'); 
        res.json(user);

    } catch (error) {
        return res.status(500).json({msg : "server error"})
    }
}

//for authentication like login for example
const userLogin = async (req, res, next) => {
   const { email, password } = req.body;
   if(!email || !password) return next(new HttpError("Fields Can't be empty" , 500));
       try { 
           const user = await User.findOne({email});
           if(!user) {
               return next(new HttpError("User not found", 400));
           }
         
           const doesUserExist = await bcrypt.compare(password, user.password);
           if(!doesUserExist) return next(new HttpError("credentials didn't match with our records", 400));
           
           token = jwt.sign({userId : user._id, email : user.email},
            process.env.token_secret,
           {expiresIn : '1h'});

           return res.status(200).json({message : 'user logged in',
           _id : user._id, email : user.email, 
           token});
       }
        catch (error) {
           return next(new HttpError("Something went wrong, try again", 500));
   }
}

//export modules
module.exports = {
    getUsers,
    userLogin
};