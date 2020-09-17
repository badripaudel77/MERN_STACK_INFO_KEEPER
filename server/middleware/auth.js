const jwt = require('jsonwebtoken');
const HttpError = require('../models/HttpError');

const auth = (req, res, next) => {

    //see if token is in header
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).json({message : "Token Is not Present."});
    
    try {
        //get the decoded value
        const payload = jwt.verify(token, process.env.token_secret);
        req.user = payload;
        next();
    } 
    catch (error) {
      return res.status(401).json({message : "Token Is not a valid token"});    
    }
}

module.exports = auth;