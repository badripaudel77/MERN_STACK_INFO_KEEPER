const express = require('express');
const router = express.Router();

const User = require('../models/User');

const  { userSignup }  = require('../controllers/UsersControllers');

//users route /api/users
//register user [signup user]
//@public access

router.post("/", userSignup);

module.exports = router;