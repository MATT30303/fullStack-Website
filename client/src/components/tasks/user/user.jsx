import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import "./user.css"

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




  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = { userID: 1 };
        const response = await axios.post("http://localhost:3001/user/userCard", data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchData();
  },[])
  useEffect(()=>{

  },[user])



  return (
    <div className="user-tab" id='user-tab'>
        <div className="user-container">
          <div className="user-title">PROFILE</div>
          <div className='user-pic'><img src={image2} alt="" className='profile-pic'/></div>
          <div className="user-data">
            <div className="user-username"></div>
            <div className="user-email"></div>
            <div className="user-password"></div>
            <div className="user-firstName"></div>
            <div className="user-lastName"></div>
          </div>
        </div>
    </div>
  )
}
