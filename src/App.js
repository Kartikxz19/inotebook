import './App.css';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
function App() {
  const [alert,setAlert]=useState(null);
  //show alert takes a message and type of the alert to pass to set alert variable
  const showAlert=(message,type)=>{
    setAlert({msg:message,type:type});
    //alert if dismissed, will never be shown again. So instead of letting the user dismiss the alert
    //let us ourself make the alert vanish after 3 secoonds by setting it to null
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  /* Wrap everything in NoteState so that the context elements can be accessed by every component inside the NoteState container */
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About/>} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
