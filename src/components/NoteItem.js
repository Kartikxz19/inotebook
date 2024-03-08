import React, { useContext } from 'react'
import NoteContext from '../context/Notes/noteContext';

const NoteItem = (props) => {
    const context=useContext(NoteContext);
    const {deleteNote}=context;
    const {note,updateNote,showAlert}=props;
  return (
    <div className='note'>
  <h5 className='note-title'>{note.title}</h5>
  
  <p className='note-desc'>{note.description}</p>
  <i className="fa-solid fa-delete-left mx-2" onClick={()=>{deleteNote(note._id);showAlert("Deleted Successfully.","success");}}></i>
  <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
</div>
  )
}

export default NoteItem;