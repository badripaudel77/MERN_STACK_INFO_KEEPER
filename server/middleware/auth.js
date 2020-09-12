const jwt = require('jsonwebtoken');
const HttpError = require('../models/HttpError');

const auth = (req, res, next) => {

    //see if token is in header
    const token = req.header('x-auth-token');

    if(!token) return next(new HttpError("No token present", 401));
    
    try {
        //get the decoded value
        const payload = jwt.verify(token, process.env.token_secret);
        req.user = payload;
        next();
    } 
    catch (error) {
      return next(new HttpError("Token isn't a valid token", 401));    
    }
}

module.exports = auth;