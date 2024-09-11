import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import "../user.css"

export default function password() {
    const [userpassword, setUserpassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userOld, setUserOld] = useState('');
    const [userNew, setUserNew] = useState('');

    let passBlock = useRef(null);

    const changePass = () =>{
        const toastId = toast.loading('Updating...');
    
        if(userNew !== userConfirmPassword){
          toast.error("Password not matching",{
            id: toastId,
          })
        }
        else if(userNew == "" || userOld == "" || userConfirmPassword == ""){
            toast.error("Fields are empty",{
                id: toastId,
            })
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
              }else{
                toast.success('correct', {
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
                duration: 3500,
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
                <input type="password" className='pass-old-box' onChange={(e)=>{setUserOld(e.target.value)}} />
              </div>

              <div className='pass-new'>
                <span className="pass-new-span">NEW PASSWORD</span>
                <input type="password" className='pass-new-box' onChange={(e)=>{setUserNew(e.target.value)}} />
              </div>
              
              <div className='pass-confirm'>
                <span className="pass-confirm-span">CONFIRM PASSWORD</span>
                <input type="password" className='pass-confirm-box' onChange={(e)=>{setUserConfirmPassword(e.target.value)}} />
              </div>

              <button className='pass-button' onClick={changePass}>CHANGE</button>
            </div>
              

          </div>
  )
}
