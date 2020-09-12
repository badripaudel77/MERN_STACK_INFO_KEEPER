const express = require('express');

const router = express.Router();

const { getNotes, createNote, updateNote, deleteNote }  = require('../controllers/NotesControllers');
const auth = require('../middleware/auth');

//contacts route /api/contacts
router.get("/", auth, getNotes);
 
//notes route /api/notes
router.post("/", auth, createNote);
 
//notes route /api/notes
router.patch("/:noteId", auth, updateNote);
 
//notes route /api/notes
router.delete("/:noteId", auth, deleteNote);

module.exports = router;