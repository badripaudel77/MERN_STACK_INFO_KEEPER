const express = require('express');

const router = express.Router();

//contacts route /api/contacts
router.get("/", (req,res) => {
    res.json({msg : "contacts"})
 });

module.exports = router;