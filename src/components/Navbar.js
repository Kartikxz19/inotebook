import React, { useEffect } from 'react'
import apple from '../apple.svg';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import '../App.css';
//You have multiple links in the navbar. The one with class-active is highlighted. What if you want that whatever page you are on , that page's link should be highlighted?
//It can be achieved with useLocation() hook from react router dom. useLocation hook returns an object of details of the page being rendered currently.
//If we use the location variable inside the classes of these links then they will be udpated whenever uselocation executes

const Navbar = () => {
    let navigate=useNavigate();
    const handleLogout=()=>{
        //clear local storage of browser so auth oken is gone
        localStorage.clear();
        //and redirect to login page
        navigate('/login');
    }
    let location=useLocation();
    useEffect(() => {//just to see what happens when uselocation updates
       // console.log(location);
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg p-3" style={{backgroundColor:'black',boxShadow:'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{color:'white'}}>
                    <img src={apple} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" style={{fillColor:'white'}} />
                    iNoteBook
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/" style={{color:location.pathname==='/'?"white":"lightgray"}}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about" style={{color:location.pathname==='/about'?"white":"lightgray"}}>About</Link>
                        </li>

                    </ul>
                    {/* Display login signin only if auth-token is null(means user has to log in) else display logout
                    //how to we do logout,simply connect the logout button to /login route.Done. */}
                    {!localStorage.getItem('auth-token')?
                    <form className="d-flex" role="search">
                        <Link className="btn btn-outline-primary rounded-pill mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-primary rounded-pill mx-2" to="/signup" role="button">SignUp</Link>
                    </form>:
                    <button className="btn btn-outline-primary rounded-pill mx-2" onClick={handleLogout} >Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
