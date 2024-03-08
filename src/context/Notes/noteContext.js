import { createContext } from "react";
const NoteContext=createContext();

export default NoteContext;
//WE ask react to create a new context. WE use this context in other files to make available some universal states, function etc which
//will be used in almost all components. So instead of prop drilling and adding states and functions as props to each component
//starting from app.js(this will be very time consuming and complicated) we define them inside a context(check NoteState.js).
//And now whenever a component wants to alter or get that state/function, it can simply call useCOntext hook and specify this file path as to which
//context it is talking about.


//Similaryl ,there is a website called shadecn/ui which proivdes you contexts which can change the theme of all the children enclosed in it
//You can simply set the theme using the buttons provided there