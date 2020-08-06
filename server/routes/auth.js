const express = require('express');

const router = express.Router();

//auth route /api/auth
router.get("/", (req,res) => {
    res.json({msg : "auth"})
 });

module.exports = router;