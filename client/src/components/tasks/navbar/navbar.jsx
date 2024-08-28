import React, { useEffect } from 'react'
import logo from "../../../assets/images/logo-color.png";
import apps from "../../../assets/images/apps.png";
import profile from "../../../assets/images/profile.png";
import note from "../../../assets/images/note.png";
import "./navbar.css"
export default function Navbar() {
  const html = document.querySelector('html');
  if (html) {
    html.style.overflow = ''; 
  }

  return (
        <div className="nav-container">
          <div className='navbar'>
            <img src={logo} className='logo-icon' alt="logo" />
            <div className="icons-container">
                <a href="#tasks-tab"><img className='icon' src={apps} alt="" /></a>
                <a href='#newTask-tab'><img className='icon' src={note} alt=""/></a>
                <a href="#user-tab"><img className='icon' src={profile} alt="" /></a>
            </div>
          </div>
        </div>
  )
}
