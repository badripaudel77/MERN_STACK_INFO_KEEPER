const express = require('express');

const router = express.Router();


//users route /api/users
router.get("/", (req,res) => {
   res.json({msg : "users"})
});

module.exports = router;