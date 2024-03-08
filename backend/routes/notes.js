//all notes functionality related endpoints will be written here.
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
//Route 1: Get all the notes using :GET request ? why not post? Because the auth token of logged in user would be in the header file which can be accessed simply using the get request. We won't be providing any form data or something.
router.get('/fetchallnotes', fetchuser, async (req, res) => { //this will work for the main route in index.js /api/notes/fetchallnotes
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        //500 will tell there some unknown error
        res.status(500).send("Internal server error");
    }
});
//Route 2: Add a new Note using: POST "/api/notes/addnote": Login Required
//we need user details to add this note 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            //If there are erros, return bad request and the errors
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            //create a new note via the Notes schema
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id
            })
            const savenote = await note.save();
            res.json(savenote);
        } catch (error) {
            console.log(error.message);
            //500 will tell there some unknown error
            res.status(500).send("Internal server error");
        }

    });
//Route 3: Update an existing note:PUT "/api/auth/updatenote" :Login required
//PUt request is generally used for updating something that is already created.
//Update only when you are the user whose note is being updated
//we give the id in the note as parameter in the route
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a new Note object
        const newNote = {};
        //if title is part of request only then add it in the new note
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        var note = await Note.findById(req.params.id);
        if (!note)//note not found
        {
            return res.status(404).send("Not found!");
        }
        //But first check whether this is the same user whose note is being updated(fetchuser middleware is returning the user id)
        if (note.user.toString() !== req.user.id)//user id in the notes is not equal to the current user logged in iD
        {
            return res.status(401).send("Not allowed");
        }
        //update function of mongoose asks for parameters to be updated as object which will be in the newNote
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });//new true means if there is a new attribute to be added in the document then add it
        res.json(note);
    } catch (error) {
        console.log(error.message);
        //500 will tell there some unknown error
        res.status(500).send("Internal server error");
    }
})
//Route 4: Update an existing note:DELETE "/api/auth/deletenote" :Login required
//DELETE request is generally used for deleting something that is already created.
//Delete only when you are the user whose note is being updated
//we give the id of the note as parameter in the route
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    //const { title, description, tag } = req.body;
    try {
        var note = await Note.findById(req.params.id);
        if (!note)//note not found
        {
            return res.status(404).send("Not found!");
        }
        //But first check whether this is the same user whose note is being deleted(fetchuser middleware is returning the user id)
        if (note.user.toString() !== req.user.id)//user id in the notes is not equal to the current user logged in iD
        {
            return res.status(401).send("Not allowed");
        }
        //update function of mongoose asks for parameters to be updated as object which will be in the newNote
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been Deleted", note: note });
    } catch (error) {
        console.log(error.message);
        //500 will tell there some unknown error
        res.status(500).send("Internal server error");
    }
})
module.exports = router;