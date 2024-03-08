import React, { useState, useContext, useEffect, useRef } from 'react'
import NoteContext from '../context/Notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const { notes, getNotes,editNote } = useContext(NoteContext);
  let navigate=useNavigate();
  useEffect(() => {
    //see you should only display notes if there exists some auth-token in the header, otherwise user should login first
    if(localStorage.getItem('auth-token'))
    {
      //if not null
      getNotes();
    }
    else
    {
      //redirect to login page
      navigate('/login');
    }
    
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);//used to give reference to any component, like we are giving reference to Modal to show up only when edit is clicked so we refer to modal using this variable ref
  const refClose = useRef(null);//for the clsoe button of modal
  const [modalnote, setModalnote] = useState({id:"", etitle: "", edescription: "", etag: "" });//specifically for the MODAL
  const handleClick = (e) => {
    e.preventDefault();//so that page doesn't reload 
    editNote(modalnote.id,modalnote.etitle,modalnote.edescription,modalnote.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully!","success");
  }
  const updateNote = (currentNote) => {
    //Modal needs to be clicked by its button to be opened. What we do is WE refer to modal's button using the useref hook
    //then we use ref.current.click() to click on that button progammatically and modal will show up.
    ref.current.click();
    setModalnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    //Notes.js has all the notes. It passes notes to each noteItem.js. NoteItem.js passes that note to updateNote(). and here, updateNote() passes it
    //to usestate of modal so that modal gets that note
  }
  const onChange = (e) => {
    //jo likha hai wo likha rahe(...), but agar kuch naya likha hai then include that also
    setModalnote({ ...modalnote, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <AddNote showAlert={props.showAlert} />
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/*  <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3 p-2'>
                <div className="mb-3 mt-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={modalnote.etitle} aria-describedby="titleHelp" onChange={onChange} />
                  <div id="titleHelp" className="form-text">We'll never share your notes with anyone else ;) Minimum 5 letters required.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={modalnote.edescription} onChange={onChange} />
                  <div id="descHelp" className="form-text">Minimum 5 letters required.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={modalnote.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
            {/* We would like to close the modal after save changes is clicked and handleclick is called
            SO we give ref to close button. Whenever we wnt we can click on this button using ref */}
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={modalnote.etitle.length<5||modalnote.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>



      <h1>Your Notes</h1>
      <div className="notes">
        
          <div className="container mx-2">
            {notes.length===0&&'NO ITEMS TO DISPLAY :('}
          </div>
          
          {
          notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          })
        }
      </div>

    </div>
  )
}

export default Notes;
