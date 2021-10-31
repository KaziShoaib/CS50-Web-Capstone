import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { logout } from "../reducers/authReducer"


const AuthLinks = () => {
  const userData = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">      
      <span className="navbar-text">
        <strong>{userData.isAuthenticated ? `Welcome ${userData.user.username}` : ''}</strong>
      </span>
      <li className="nav-item">
        <button className="nav-link btn btn-info btn-sm text-light" onClick = {() => { dispatch(logout())}}>
          Logout
        </button>               
      </li>  
    </ul>
  )
}


const GuestLinks = () => {
  return (
    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
      <li className="nav-item">              
        <Link className="nav-link" to="/register">Register</Link>              
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>  
      </li> 
    </ul>
  )
}


const Header = () => {
  const userData = useSelector(state => state.auth)
  
  const navStyle = {
    backgroundColor: '#e3f2fd'
  }  

  return (   

    <nav className="navbar navbar-expand-sm navbar-light mb-4" style={navStyle}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#">Todos</a>
          { userData.isAuthenticated ? <AuthLinks/> : <GuestLinks/> }
          
        </div>
      </div>
    </nav>
  )
}

export default Header