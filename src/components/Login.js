import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    //HOoks can only be declared inside function components.
    const [creds, setcreds] = useState({email:"",password:""});
    const navigate = useNavigate();// check details in if statement in handleClick()
    const handleclick =async (e) => {
        e.preventDefault();
        
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:creds.email,password:creds.password})
        });
        const json=await response.json();
        console.log(json);
        if(json.success)
        {
            //save the auth token in browser. HOW? The localStorage object allows you to save key/value pairs in thebrowser.We will use localStorage.getITem to get this item from our browser storage and add it to our Header part of request
            localStorage.setItem('auth-token',json.authToken);
            props.showAlert("Logged In Successfully !","success");
            //redirect to the home page with the user logged in.HOW? It's not like we are in express and use res.redirect.
            //The useNavigate hook(by react-router-dom) returns a function that lets you navigate programmatically
            navigate("/");
            
        }
        else
        {
            props.showAlert("Invalid Credentials! Please try again ","danger")
        }
    };
    const onChange=(e)=>{
        setcreds({...creds,[e.target.name]:e.target.value});
    }
    return (
        <div className='logindiv' >
        <h2 style={{color:'lightpink'}}>Login</h2>
            <form onSubmit={handleclick}>
                <div className="form-floating mb-3 my-3">
                    <input type="email" className="form-control" placeholder="name@example.com" id="email" name="email" onChange={onChange} value={creds.email}/>
                        <label htmlFor="email">Email address</label>
                        <div id="emailHelp" className="form-text text-primary">We'll never share your email with anyone else.</div>
                </div>
                <div className="form-floating my-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={onChange} value={creds.password}/>
                        <label htmlFor="password">Password</label>
                </div>

                <button type="submit" className="btn btn-primary my-3">Login</button>
            </form>
        </div>

    )
}

export default Login
