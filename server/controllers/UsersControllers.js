const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/HttpError');
const User = require('../models/User');

//load the config file
dotenv.config({path: './config/config.env' });

const userSignup = async (req, res, next ) => {
    const { name, email , password } = req.body;
    console.log('backend ', req.body);
    
    let doesUserExist;    
    try {
      doesUserExist  = await User.findOne({ email : email });
     
      if(doesUserExist) {
        return res.status(500).json({message : 'User Already exist.'});
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
          return res.status(500).json({message : "couldn't signup "});
        }
        return res.status(200).json({
        // _id : newUser._id, email : newUser.email, 
        token});
      }
    } 
    catch (error) {
      return res.status(500).json({message : "couldn't signup, something went wrong. "});

    }
};

//export modules
module.exports = {
    userSignup,
};