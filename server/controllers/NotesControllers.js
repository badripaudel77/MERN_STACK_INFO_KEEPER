const dotenv = require('dotenv');

const HttpError = require('../models/HttpError');
const User = require('../models/User');
const Note = require('../models/Note');
const { findById } = require('../models/User');

//load the config file
dotenv.config({path: './config/config.env' });

const getNotes = async (req, res, next) => {
    try {
        //sort by recent note
        const notes = await Note.find({user : req.user.userId}).sort({date : -1}); 
        return res.status(200).json(notes);
    } 
    catch (error) {
        return res.status(500).json({msg : "error occured while retrieving notes."});
    }
} 

const createNote = async (req, res, next ) => {
    const { name , email, phone, important } = req.body;

    const newNote = new Note({
        name,
        email,
        phone,
        important,
        user : req.user.userId,
    });
    try {
        const note  = await newNote.save();
        return res.status(201).json({note});
    } 
    catch (error) {
      return next(new HttpError("couldn't save the note.", 500));    
    }
};

const updateNote = async (req, res, next) => {
    const noteId  = req.params.noteId; 
    const { name , email, phone, important } = req.body;

    const userId = req.user.userId;
    try {
        const note = await Note.findById(noteId);
        // console.log(note, userId)

        if(!note) return next(new HttpError("Note with that Id not doesn't exist.", 404));
       
        if(!(note.user == userId)) return next(new HttpError("unauthorized access.", 404));

        note.name = name;
        note.email = email;
        note.phone= phone;
        note.important = important;

        const updatedNote = await note.save();
        return res.status(200).json({updatedNote});
    } 
    catch (error) {
        return next(new HttpError("Something  went wrong  while updating Note.", 500))
    }
};

const deleteNote = async (req, res, next) => {
    const noteId = req.params.noteId;

    const userId = req.user.userId;
    
    try {
        const note = await Note.findById(noteId);
        
        if(!note) {
            return next(new HttpError("Note Not found", 404));
        }

        console.log(note, userId);

        if(!(note.user == userId) ) {
              return next(new HttpError("unauthorized access.", 404));
        }

        const deletedNote = await note.remove();
        return res.status(200).json({deletedNote});
    }
    
    catch(error) {
         return next(new HttpError("Something went wrong while deleting the note.", 500));
    }
};

//export modules
module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
};