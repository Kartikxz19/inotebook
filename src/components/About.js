import { React, useEffect, useContext } from 'react'
import NoteContext from '../context/Notes/noteContext';
const About = () => {
  const a = useContext(NoteContext);
  //now a has access to all the states, function you had defined for notecontext in NoteState.js
  //we use useEffect to mimic componentdidMount by running useeffect exactly once
  useEffect(() => {
    a.update()
  }
    , []
  );
  a.update();
  return (

    <div class="mx-auto p-3 container" style={{width:'500px',textAlign:'center'}}>
    <h1>Myself {a.state.name}</h1>
      <h2>I am a {a.state.role}😁</h2>
    </div>
  )
}

export default About
