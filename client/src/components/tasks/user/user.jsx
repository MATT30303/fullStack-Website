import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import "./user.css";
import Password from "./password/password"

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
import avatar from "../../../assets/profile_fotos/pf_avatar.png"

export default function User() {
  const [user, setUser] = useState([]);

  const [userUsername, setUserUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userfirstName, setUserfirstName] = useState('');
  const [userlastName, setUserlastName] = useState('');
  const [profile, setProfile] = useState(0);

  const [count, setCount] = useState(0);
  const pfp = useRef(null);
  const profilePic = useRef(null);
  const uploadPic = useRef(null);


  let userBlock = useRef(null);

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
        const response = await axios.post("https://flanstdl.onrender.com/user/userCard",{},{
          withCredentials: true
        });
        setUser(response.data[0]);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchData();
  },[]);




  useEffect(()=>{
    setUserUsername(user.username);
    setUserEmail(user.email);
    setUserfirstName(user.firstName);
    setUserlastName(user.lastName);
    setProfile(user.pic);
  },[user]);

  useEffect(()=>{
    profilePic.current.src = pic[profile];
  },[profile])
 
 
  const showpfp = () =>{
    if(count == 0){
      pfp.current.className="user-pic";
      uploadPic.current.className="select-pic";
      setCount(1);
    }
    else{
      pfp.current.className="user-pic-none";
      uploadPic.current.className="select-pic-none";
      setCount(0);
    }
  }
  
 
  const save = () =>{
    const toastId = toast.loading('Updating...');
    let currentDate = new Date().toJSON().slice(0, 10);
    const data = {
      username: userUsername,
      email: userEmail,
      updatedAt: currentDate,
      firstName: userfirstName,
      lastName: userlastName,
      pic: profile,
    }
    if(userUsername == "" || userEmail == "" || currentDate == "" || userfirstName == "" || userlastName== "" || profile == "" || userEmail == "@"){
      toast.error("All fields must be completed",{
        id: toastId,
      })
    }
    else{
      try{
        axios.post("https://flanstdl.onrender.com/user/userUpdate",data, {
          withCredentials: true
        }).then((response)=>{
          if(response.data === "incorrect" || response.data === "error"){
            toast.error("Something went wrong. Try again later",{
              id: toastId,
            })
          }else{
            toast.success('Updated successfully', {
              id: toastId,
            });
          }
        })
      }catch (error) {
        toast.error("Something went wrong. Try again later",{
          id: toastId,
        })
      }
    }
  }
  
  

  const pass = () =>{
    if(userBlock.current.className == "user-container" ) userBlock.current.className="user-container-pass";
    else userBlock.current.className="user-container"; 
  }


  

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


        <div className="user-container" ref={userBlock}>
          
          <div className="user-title">PROFILE</div>
          
          <div className='user-pic-none'ref={pfp} >
            
            <div className='selected-pfp'>
              <img src={pic[user.pic]} alt="" ref={profilePic} className='profile-pic'onClick={showpfp}/>
              <img src={avatar} alt="" className='profile-pic' id='avatar' onClick={showpfp}/>
                
              <div className='select-pic-none' ref={uploadPic} >
                <img src={picture} alt=""  className='select-image' />
              </div>
            </div>

            <div className='user-pfp'>
              {pic.map((pic, index) => (
                <img src={pic} key={index} id={index} className='pfp' alt={`Profile ${index}`} onClick={(e)=>{ setProfile(e.target.id) }}  />
              ))}
            </div>

          
          </div>

              <Password></Password>
          

          <div className="user-data">

            <div className="user-username">
              <span className='username-span'>USER NAME</span>
              <input type="text" className='username-input' defaultValue={user.username || ""} required onChange={(e)=>{setUserUsername(e.target.value)}}/>
            </div>
            
            <div className="user-email">
            <span className='email-span'>E-MAIL</span>
            <input type="email" className='email-input' defaultValue={user.email || ""} required onChange={(e)=>{setUserEmail(e.target.value)}}/>
            </div>
            
            <div className="user-firstName">
            <span className='firstName-span'>FIRST NAME</span>
            <input type="text" className='firstName-input'defaultValue={user.firstName || ""} required onChange={(e)=>{setUserfirstName(e.target.value)}}/>
            </div>
            
            <div className="user-lastName">
            <span className='lastName-span'>LAST NAME</span>
            <input type="text" className='lastName-input'defaultValue={user.lastName || ""} required onChange={(e)=>{setUserlastName(e.target.value)}}/>
            </div>

            
            <div className='user-date'>
              <span className='date-span'>account creation date: {user.createdAt || "undefined"}</span>
            </div>

            <div className="user-button">
              <button className='button-save' onClick={save}>SAVE</button>
            </div>

            <div className="user-password">
              <button className='password-button' onClick={pass}>CHANGE PASSWORD</button>
            </div>
            
          
          </div>
            
          
        </div>
    </div>
  )
}
