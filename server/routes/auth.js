const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const {getUsers, userLogin} = require('../controllers/AuthControllers');

//auth route /api/auth

//get user private access, only logged in user can see its notes / contacts
router.get("/", auth, getUsers);

//login
router.post("/", userLogin);



module.exports = router;