import React, { useContext, useState } from 'react'
import NoteContext from '../context/Notes/noteContext';

const AddNote = (props) => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "General" });
  const handleClick = (e) => {
    e.preventDefault();//so that page doesn't reload 
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note added successfully!","success");
    setNote({title: "", description: "", tag: "General" });//dont give user the option to add same note again and again.
  }

  const onChange = (e) => {
    //jo likha hai wo likha rahe(...), but agar kuch naya likha hai then include that also
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <div className='container my-3'>
      <h1>Add a Note</h1>
      <form className='my-3 p-2'>
        <div className="mb-3 mt-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp" value={note.title} onChange={onChange} />
          <div id="titleHelp" className="form-text">We'll never share your notes with anyone else ;) Minimum 5 letters required.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
          <div id="descHelp" className="form-text">Minimum 5 letters required.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
        </div>
        <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default AddNote
