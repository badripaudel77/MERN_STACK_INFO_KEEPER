const express = require('express');

const router = express.Router();

//contacts route /api/contacts
router.get("/", (req,res) => {
    res.json({msg : "get contacts"})
 });
 
//contacts route /api/contacts
router.post("/", (req,res) => {
    res.json({msg : "create contacts"})
 });
 
//contacts route /api/contacts
router.patch("/:contactId", (req,res) => {
    res.json({msg : " update contacts"})
 });
 
//contacts route /api/contacts
router.delete("/:contactId", (req,res) => {
    res.json({msg : " delete contacts"})
 });

module.exports = router;