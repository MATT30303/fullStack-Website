import React from 'react'
import logo from "../../../assets/images/logo-color.png";
import apps from "../../../assets/images/apps.png";
import profile from "../../../assets/images/profile.png";
import note from "../../../assets/images/note.png";
import "./navbar.css"
export default function Navbar() {
  return (
    
        <div className="nav-container">
            <img src={logo} className='logo-icon' alt="logo" />
            <div className="icons-container">
                <a href="#"><img className='icon' src={apps} alt="" /></a>
                <a href="#"><img className='icon' src={note} alt="" /></a>
                <a href="#"><img className='icon' src={profile} alt="" /></a>
            </div>
        </div>
    

  )
}
