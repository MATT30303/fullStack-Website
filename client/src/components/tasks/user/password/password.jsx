import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import "../user.css"

import eye from '../../../../assets/images/eye.png';
import eye_off from '../../../../assets/images/eye_off.png';


export default function password() {
    const [userpassword, setUserpassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userOld, setUserOld] = useState('');
    const [userNew, setUserNew] = useState('');

    let passBlock = useRef(null);

    let oldBox = useRef(null);
    let newBox = useRef(null);
    let confBox = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);

    const changePass = () =>{
        const toastId = toast.loading('Updating...');
    
        if(userNew !== userConfirmPassword){
          toast.error("Password not matching",{
            id: toastId,
          })
          newBox.current.className="pass-new-box-error";
          confBox.current.className="pass-confirm-box-error";
        }
        else if(userNew == "" || userOld == "" || userConfirmPassword == ""){
            toast.error("Fields are empty",{
                id: toastId,
            })
            oldBox.current.className="pass-old-box-error";
            newBox.current.className="pass-new-box-error";
            confBox.current.className="pass-confirm-box-error";
        }
        else{
          const data = {
            password: userOld,
            userID: 1
          }
          try{
            axios.post("http://localhost:3001/user/userPassword",data).then((response)=>{
              if(response.data === "incorrect"){
                toast.error("Old password is incorrect",{
                  id: toastId,
                })
                oldBox.current.className="pass-old-box-error";
              }else{
                updatePass(toastId);
              }
            })
          }catch (error) {
            toast.error("Something went wrong. Try again later",{
              id: toastId,
            })
          }
        }
    }

    const updatePass = (toastId)=>{
      console.log("entro");
      const data = {
        password: userOld,
        userID: 1
      }
      try{
        axios.post("http://localhost:3001/user/passUpdate",data).then((response)=>{
          if(response.data === "incorrect"){
            toast.error("Something went Wrong. Try again later.",{
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



    const borderFix = () =>{
      oldBox.current.className="pass-old-box";
      newBox.current.className="pass-new-box";
      confBox.current.className="pass-confirm-box";
    }

    const visible = (num) =>{
      if(num == 1){
        box1.current.className="pass-eye-off";
        oldBox.current.type="text";
      }
      if(num == 2){
        box2.current.className="pass-eye-off";
        newBox.current.type="text";
      }
      if(num == 3){
        box3.current.className="pass-eye-off";
        confBox.current.type="text";
      }
    }
    const invisible = (num) =>{
      if(num == 1){
        box1.current.className="pass-eye";
        oldBox.current.type="password";
      }
      if(num == 2){
        box2.current.className="pass-eye";
        newBox.current.type="password";
      }
      if(num == 3){
        box3.current.className="pass-eye";
        confBox.current.type="password";
      }
    }

  return (
    <div className='changePass' ref={passBlock}>

        <Toaster
          toastOptions={{
            className: '',
            style: {
              border: '1px solid #FFB6C1',
              padding: '16px',
              color: '#FAF9F6',
              background: "#2c2c2c",
            },
            error: {
                duration: 4000,
              style: {
                border: '1px solid #F33A6A',
                padding: '16px',
                color: '#FAF9F6',
                background: "#2c2c2c",
              },
        }}}
      />

            <div className='pass-title'>PASSWORD</div>

            <div className='pass-data'>

              <div className="pass-old">
                <span className='pass-old-span'>OLD PASSWORD</span>
                <input type="password" className='pass-old-box' ref={oldBox} onChange={(e)=>{setUserOld(e.target.value)}} onClick={borderFix} />
                <div className='pass-eye' ref={box1} >
                  <img src={eye} alt="" className='eye-img' onClick={(e)=>{visible(1)}}/>
                  <img src={eye_off} alt="" className='eye-off-img' onClick={(e)=>{invisible(1)}}/>
                </div>
              </div>

              <div className='pass-new'>
                <span className="pass-new-span">NEW PASSWORD</span>
                <input type="password" className='pass-new-box' ref={newBox} onChange={(e)=>{setUserNew(e.target.value)}} onClick={borderFix} />
                <div className='pass-eye' ref={box2} >
                  <img src={eye} alt="" className='eye-img' onClick={(e)=>{visible(2)}}/>
                  <img src={eye_off} alt="" className='eye-off-img' onClick={(e)=>{invisible(2)}}/>
                </div>
              </div>
              
              <div className='pass-confirm'>
                <span className="pass-confirm-span">CONFIRM PASSWORD</span>
                <input type="password" className='pass-confirm-box' ref={confBox} onChange={(e)=>{setUserConfirmPassword(e.target.value)}} onClick={borderFix}/>
                <div className='pass-eye' ref={box3} >
                  <img src={eye} alt="" className='eye-img' onClick={(e)=>{visible(3)}}/>
                  <img src={eye_off} alt="" className='eye-off-img'onClick={(e)=>{invisible(3)}}/>
                </div>
              </div>

              <button className='pass-button' onClick={changePass}>CHANGE</button>
            </div>
              

          </div>
  )
}
