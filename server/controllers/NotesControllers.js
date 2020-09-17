const dotenv = require('dotenv');

const HttpError = require('../models/HttpError');
const Note = require('../models/Note');

//load the config file
dotenv.config({path: './config/config.env' });

const getNotes = async (req, res, next) => {
    try {
        //sort by recent note
        const notes = await Note.find({user : req.user.userId}).sort({date : -1}); 
        return res.status(200).json({notes});
    } 
    catch (error) {
        return res.status(500).json({message : "error occured while retrieving notes."});
    }
} 

const createNote = async (req, res, next ) => {
    const { name , email, phone } = req.body;

    const newNote = new Note({
        name,
        email,
        phone,
        user : req.user.userId,
    });
    try {
        const note  = await newNote.save();
        return res.status(201).json({note});
    } 
    catch (error) {
      return res.status(500).json({message : "couldn't save the note."});    
    }
};

const updateNote = async (req, res, next) => {
    const noteId  = req.params.noteId; 
    const { name , email, phone } = req.body;

    const userId = req.user.userId;
    try {
        const note = await Note.findById(noteId);
        // console.log(note, userId)

        if(!note) return res.status(404).json({message : "Note with that Id not doesn't exist."});
       
        if(!(note.user == userId)) return res.status(404).json({message : "unauthorized access."});

        note.name = name;
        note.email = email;
        note.phone= phone;

        const updatedNote = await note.save();
        console.log('note updated ', updatedNote)
        return res.status(200).json({updatedNote});
    } 
    catch (error) {
        return res.status(500).json({message : "Something  went wrong  while updating Note." });
    }
};

const deleteNote = async (req, res, next) => {
    const noteId = req.params.noteId;

    const userId = req.user.userId;
    
    try {
        const note = await Note.findById(noteId);
        
        if(!note) {
            return res.status(404).json({message : "Note Not found"});
        }

        console.log(note, userId);

        if(!(note.user == userId) ) {
              return res.status(404).json({message :"unauthorized access."});
        }

        const deletedNote = await note.remove();
        return res.status(200).json({deletedNote});
    }
    
    catch(error) {
         return res.status(500).json({ message :"Something went wrong while deleting the note."});
    }
};

//export modules
module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
};