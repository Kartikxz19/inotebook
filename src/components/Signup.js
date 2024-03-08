import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  //HOoks can only be declared inside function components.
  const [creds, setcreds] = useState({name:"",email:"",password:"",cpassword:""});
  const navigate = useNavigate();// check details in if statement in handleClick()
  const handleclick =async (e) => {
      e.preventDefault();
      
      const response=await fetch("http://localhost:5000/api/auth/createuser",{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({name:creds.name,email:creds.email,password:creds.password})
      });
      const json=await response.json();
      console.log(json);
      //if sucess log the user in automatically
      if(json.success)
      {
          //save the auth token in browser. HOW? The localStorage object allows you to save key/value pairs in thebrowser.
          localStorage.setItem('auth-token',json.authToken);
          //redirect to the home page with the user logged in.HOW? It's not like we are in express and use res.redirect.
          //The useNavigate hook(by react-router-dom) returns a function that lets you navigate programmatically
          navigate("/");
          props.showAlert("Account Created Successfully!","success");
      }
      else
      {
          props.showAlert("Invalid Credentials","danger");
      }
  };
  //useEffect runs after any change/update in cpassword or password and thus displaying red or green border depending the passwords being equal or not.
  //Why not just do this inside the onchange() function?Because even though the setstate is used, values are actually updated only after re-render, so anything written in onCHange will use old values and thus give ambiguous results.
  useEffect(() => {
    const cpass=document.getElementById("cpassword");
      if(creds.password!==creds.cpassword)
      {
        cpass.style.border="5px solid red";
      }
      else
      {
        cpass.style.border="5px solid green";
      }
  }, [creds.cpassword,creds.password]);
  const onChange=(e)=>{
    setcreds({...creds,[e.target.name]:e.target.value});
  }
  return (
      <div className='logindiv' >
          <h2 style={{color:'lightpink'}}>Sign Up</h2>
          <form onSubmit={handleclick}>
          <div className="form-floating mb-3 my-3">
                  <input type="text" className="form-control" placeholder="name@example.com" id="name" name="name" onChange={onChange} value={creds.name}/>
                      <label htmlFor="email">Name</label>
          </div>
              <div className="form-floating mb-3 my-3">
                  <input type="email" className="form-control" placeholder="name@example.com" id="email" name="email" onChange={onChange} value={creds.email}/>
                      <label htmlFor="email">Email address</label>
                      <div id="emailHelp" className="form-text text-primary">We'll never share your email with anyone else.</div>
              </div>
              <div className="form-floating my-3">
                  <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={onChange} minLength={5} value={creds.password} required/>
                      <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating my-3">
                  <input type="password" className="form-control" id="cpassword" placeholder="Confirm Password" name="cpassword" onChange={onChange} minLength={5} value={creds.cpassword} required/>
                      <label htmlFor="password">Confirm Password</label>
              </div>

              <button type="submit" className="btn btn-primary my-3">Signup</button>
          </form>
      </div>

  )
}

export default Signup;