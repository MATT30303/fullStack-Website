import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import "./user.css"

import picture from "../../../assets/images/picture_icon.png";
import image1 from "../../../assets/profile_fotos/pf_default.png"
import image2 from "../../../assets/profile_fotos/pf_depre.png"
import image3 from "../../../assets/profile_fotos/pf_disco.png"
import image4 from "../../../assets/profile_fotos/pf_donot.png"
import image5 from "../../../assets/profile_fotos/pf_foco.png"
import image6 from "../../../assets/profile_fotos/pf_fumanchin.png"
import image7 from "../../../assets/profile_fotos/pf_huesos.png"
import image8 from "../../../assets/profile_fotos/pf_instakill.png"
import image9 from "../../../assets/profile_fotos/pf_loquito.png"
import image10 from "../../../assets/profile_fotos/pf_que.png"
import image11 from "../../../assets/profile_fotos/pf_quelepasaba.png"
import image12 from "../../../assets/profile_fotos/pf_zarpade.png"

export default function user() {
  const [user, setUser] = useState([]);

  const [userUsername, setUserUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [userfirstName, setUserfirstName] = useState('');
  const [userlastName, setUserlastName] = useState('');
  const [userUpdated, setUserUpdated] = useState('');

  const pic = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
  ];

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = { userID: 1 };
        const response = await axios.post("http://localhost:3001/user/userCard", data);
        setUser(response.data[0]);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchData();
  },[])

  useEffect(()=>{
    setUserUsername(user.username);
    setUserEmail(user.email);
    setUserpassword(user.password);
    setUserConfirmPassword(user.pasword);
    setUserfirstName(user.firstName);
    setUserlastName(user.lastName);
  },[user])


  return (
    <div className="user-tab" id='user-tab'>
      <div><Toaster
          toastOptions={{
            className: '',
            style: {
              border: '1px solid #FFB6C1',
              padding: '16px',
              color: '#FAF9F6',
              background: "#2c2c2c",
            },
            error: {
              style: {
                border: '1px solid #F33A6A',
                padding: '16px',
                color: '#FAF9F6',
                background: "#2c2c2c",
              },
        }}}
      /></div>


        <div className="user-container">
          
          <div className="user-title">PROFILE</div>
          
          <div className='user-pic'>
            <img src={pic[user.pic]} alt="" className='profile-pic'/>
            <img src={picture} alt=""className='select-pic' />
            <div className='user-pfp'>
              {pic.map((pic, index) => (
                <img src={pic} key={index} className='pfp' alt={`Profile ${index}`} />
              ))}
            </div>

          
          </div>



          <div className='user-date'>
            <span className='date-span'>account creation date: {user.createdAt || "undefined"}</span>
          </div>

          <div className='user-button'>
            <button className='button-save'>SAVE</button>
          </div>

          <div className="user-data">
            <div className="user-username">
              <span className='username-span'>USER NAME</span>
              <input type="text" className='username-input'/>
            </div>
            <div className="user-email">
            <span className='email-span'>E-MAIL</span>
            <input type="email" className='email-input'/>
            </div>
            <div className="user-password">
            <span className='password-span'>PASSWORD</span>
            <input type="password" className='password-input'/>
            </div>
            <div className="user-firstName">
            <span className='firstName-span'>FIRST NAME</span>
            <input type="text" className='firstName-input'/>
            </div>
            <div className="user-lastName">
            <span className='lastName-span'>LAST NAME</span>
            <input type="text" className='lastName-input'/>
            </div>
          </div>

          
          
        </div>
    </div>
  )
}
