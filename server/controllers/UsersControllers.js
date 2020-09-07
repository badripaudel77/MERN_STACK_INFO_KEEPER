const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/HttpError');
const User = require('../models/User');

//load the config file
dotenv.config({path: './config/config.env' });

const userSignup = async (req, res, next ) => {
    const { name, email , password } = req.body;
    
    let doesUserExist;    
    try {
      doesUserExist  = await User.findOne({ email : email });
     
      if(doesUserExist) {
        return next(new HttpError("user with this email already exists.", 500));
      }

      else {
            // [ encrypt ] hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
            name,
            email,
            password : hashedPassword
        });

        try {
            await newUser.save();
           token = jwt.sign({userId : newUser._id, email : newUser.email},
                  process.env.token_secret,
                 {expiresIn : '1h'});
        } 
        catch (error) {
            return next(new HttpError("couldn't signup the user." , 500));
        }
        return res.status(200).json({message : 'user created',
        _id : newUser._id, email : newUser.email, 
        token});
      }
    } 
    catch (error) {
        return next(new HttpError("couldn't signup, please try again.", 500));
    }
};

//export modules
module.exports = {
    userSignup,
};