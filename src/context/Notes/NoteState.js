import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {//this Function specifies all the things that will be in the notecontext context and what the components can use universally
  const host = "http://localhost:5000";
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes);//contains the notes fetched by getNotes()
  
  
  //GET all nnotes
  const getNotes = async() => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`,
     { method: 'GET', 
       headers: {
         'Content-type': 'application/json',
         'auth-token':localStorage.getItem('auth-token') }, 
    });
    const json=await response.json();
    //console.log(json);
    setNotes(json);//adds the response to notes state variable
  }
  //add a note
  const addNote=async (title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/addnote`,
     { method: 'POST', 
       headers: {
         'Content-type': 'application/json',
         'auth-token':localStorage.getItem('auth-token') }, 
         body: JSON.stringify({title,description,tag})
    });
    const json=await response.json();
    //after getting response of the collection inserted in json variable, concat it to notes state to update frontend
    setNotes(notes.concat(json));
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    /* const response =  */await fetch(`${host}/api/notes/updatenote/${id}`,
     { method: 'PUT', 
       headers: {
         'Content-type': 'application/json',
         'auth-token':localStorage.getItem('auth-token') }, 
       body: JSON.stringify({title,description,tag}) 
    });
    //const json=await response.json();
    //console.log(json);
    //Logic to adit in frontend as well
    //React will never update notes state if you made changes in the same variable. YOu need to make a new notes variable and use setNotes with that
    //so firsst create a deep copy of notes state(deep copy means each and every nested element to be copied)
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id===id)
      {
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  //Delete a note
  const deleteNote = async(id) => {
    //API CALL
    /* const response =  */await fetch(`${host}/api/notes/deletenote/${id}`,
     { method: 'DELETE', 
       headers: {
         'Content-type': 'application/json',
         'auth-token':localStorage.getItem('auth-token') }, 
    });
    //const json=await response.json();
    //console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNotes);
  }
  //these are for the about page
  const s1 = {
    "name": "Lartik",
    "role": "Dev"
  }
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        "name": "Kartik Srivastava",
        "role": "MERN Stack DEV"
      })
    }, 2000);
  }
  return (
    //boilerplate code for setting up a context. Value field is js object which specfies what all things are available for a component to use from this context
    <NoteContext.Provider value={{ state, update, notes, addNote,getNotes, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;