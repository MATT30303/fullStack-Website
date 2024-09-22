import logo from "../../../assets/images/logo-color.png";
import apps from "../../../assets/images/apps.png";
import profile from "../../../assets/images/profile.png";
import note from "../../../assets/images/note.png";
import logout from "../../../assets/images/logout.png";
import axios from "axios";
import "./navbar.css"
import { useRef } from "react";
export default function Navbar() {
  let box = useRef(null)
  const handleLogout = async () => {
    try {
      await axios.post("https://flanstdl.onrender.com/user/logout",{}, {
        withCredentials: true,
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleDeny = () =>{
    box.current.className="logout-tab-none"
  }
  const handleBox = () => {
    box.current.className="logout-tab-show";
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
                <span className="logout" onClick={handleBox}><img className='icon' src={logout} alt="" /></span>
                <div className="logout-tab-none" ref={box}>
                  <div className="logout-box">
                    <span className="logout-span">Are you sure you want to Log out?</span>
                    <div className="logout-buttons">
                      <button className="button" onClick={handleLogout}>Yes</button>
                      <button className="button" onClick={handleDeny}>No</button>
                    </div>
                  </div>
                </div>
          </div>
        </div>
  )
}
