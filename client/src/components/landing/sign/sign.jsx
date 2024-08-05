import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from "axios";
import logo from "../../../assets/images/logo-color.png"
import "./sign.css"
export default function Sign() {
  let switcher = useRef(null);
  let signIn = useRef(null);
  let textContainer = useRef(null);
  let register = useRef(null);

  let checkSignEmail = useRef(null);
  let checkSignPassword = useRef(null);
  let wrongText = useRef(null);

  let wrongRegText = useRef(null);
  let wrongEmail = useRef(null);
  let wrongRegPass = useRef(null);
  let wrongRegConfirm = useRef(null);



  const [user, setUser] = useState([])
  const [checkPass, setCheckPass] = useState('');
  
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");

  const [count, setCount] = useState(1);
  const [signChange, setSignChange] = useState (""); 
  const startedHandeler = () =>{
    if(count === 1){
      switcher.current.className="all-container-register";
      signIn.current.className="signin-none";
      textContainer.current.className="text-container-right";
      register.current.className="register-show"
      setCount(2);
    }if(count === 2){
      switcher.current.className="all-container-sign";
      signIn.current.className="signin-show";
      textContainer.current.className="text-container";
      register.current.className="register-none"
      setCount(1);
    }
  }
  const navigate = useNavigate()
  const handleNavigate =() =>{
    navigate("/tasks")
  }

  const handleSignSubmit = (event) => {
    event.preventDefault();
    const data = {email: signEmail, password: signPassword};
    axios.post("http://localhost:3001/getUser", data).then((response)=>{
      if(response.data === "incorrect"){
        handleSignError();
      }else{
        handleNavigate();
      }
    })
  }
  
  const handleSignError=()=>{
    checkSignEmail.current.className="wrongEmail";
    checkSignPassword.current.className="wrongPassword";
    wrongText.current.className="Wrong-sign-text";
    wrongText.current.innerHTML="Incorrect email or password. <br> Please try again.";
  }
  const handlesignFix = () =>{
    checkSignEmail.current.className="email";
    checkSignPassword.current.className="password";
    wrongText.current.className="sign-text";
    wrongText.current.innerHTML="Enter your account details below";
    
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault();


    if(registerPassword === registerConfirm){
      const data = {email: registerEmail};
      axios.post("http://localhost:3001/User/check", data).then((response)=>{
        console.log(response.data);
        if(response.data === "incorrect"){
          handleEmailError();
        }else if(response.data === "empty"){
          handleEmailEmpty();
        }
        else{
          handleInsert();
        }
      })
    }else handlePassError();
    
    
  }
  const handleInsert = () =>{
    const data = {
      username: registerUsername,
      password: registerPassword,
      email: registerEmail,
      firstName: registerName,
      lastName: registerLastName
    };
    axios.post("http://localhost:3001/user", data).then((response)=>{
      if(response.data === "incorrect"){
        handleSomethingWrong();
      }else{
        handleNavigate();
      }
    })
  }
  const handleSomethingWrong =() =>{
    wrongRegText.current.innerHTML="something went wrong. <br>Try again later."
    wrongRegText.current.className="wrong-reg-text";
  }
  const handleEmailError =() =>{
    wrongEmail.current.className="wrongEmail";
    wrongRegText.current.innerHTML="There is an account with that email"
    wrongRegText.current.className="wrong-reg-text";
  }
  const handleEmailEmpty =() =>{
    wrongEmail.current.className="wrongEmail";
    wrongRegText.current.innerHTML="Email is empty"
    wrongRegText.current.className="wrong-reg-text";
  }
  const handlePassError =() =>{
    wrongRegPass.current.className="wrongPassword";
    wrongRegConfirm.current.className="wrongPassword"
    wrongRegText.current.className="wrong-reg-text";
    wrongRegText.current.innerHTML="Passwords are not the same";
  }
  
  
  const handleRegisterfix =() =>{
    wrongRegPass.current.className="password";
    wrongRegConfirm.current.className="password";
    wrongEmail.current.className="email";
    wrongRegText.current.className="register-text";
    wrongRegText.current.innerHTML="Complete with your details below";
  }



  return (
  <div>
    <div  className='text-container' ref={textContainer}>
        <span className='bg-title'>Flan's To-Do List</span>
        <span className='bg-description'>A place to set up and manage your daily tasks!</span>
        <span className='bg-dev'>&copy; Matt-dev</span>
    </div>

  <div className='all-container' ref={switcher}>
    
      
    
<div className='signin' ref={signIn}> 
      <div className='logo-container'><img className='logo-img' src={logo} alt="logo" /></div>
      <div className='sign-container' >
        <span className="title">Sign in to Flan's</span>
        <span className="sign-text" ref={wrongText}>Enter your account details below</span>
        <form action="" className="sign-account" onSubmit={handleSignSubmit} >
          <input className='email' type="email" autoComplete='off' required name="email" id="signEmail" placeholder='Email Adress' ref={checkSignEmail}  onChange={(e)=>{setSignEmail(e.target.value); handlesignFix()}} />
          <input className='password' type="password" name='password' required id='signPassword' placeholder='Password' ref={checkSignPassword} onChange={(e)=>{setSignPassword(e.target.value); handlesignFix()}}/>
          
          <button className='sign-button'>Sign in</button>
          
        </form>
        <span className='forgot'>Forgot your password?</span>
      </div>
      <hr/>
      <div className='reg-container'>
        <span className='reg-account'>Don't have an account?</span>
        <button className='get-started' onClick={startedHandeler}>Get Started</button>
      </div> 
    </div>
    

    
    <div className='register' ref={register}>
    <div className='register-container' >
        <span className="register-title">Welcome to Flan's</span>
        <span className="register-text" ref={wrongRegText} >Complete with your details below</span>
        <form action="" className="register-account" onSubmit={handleRegisterSubmit}>
          <input className='email' ref={wrongEmail} type="text" required  autoComplete='off' name="email" id="registerEmail" placeholder='Email Adress' onChange={(e)=>{setRegisterEmail(e.target.value); handleRegisterfix()}}/>
          <input className='firstName' type="text" autoComplete='off' required  name='firstName' id='firstName' placeholder='First Name' onChange={(e)=>{setRegisterName(e.target.value);handleRegisterfix()}} />
          <input className='lastName' type="text" autoComplete='off' required  name='lastName' id='lastName' placeholder='Last Name'onChange={(e)=>{setRegisterLastName(e.target.value);handleRegisterfix()}} />
          <input className='username' type="text" autoComplete='off' required  name='username' id='username' placeholder='Username'onChange={(e)=>{setRegisterUsername(e.target.value);handleRegisterfix()}} />
          <input className='password' ref={wrongRegPass} type="password"  required  name='password' id='registerPassword' placeholder='Password' onChange={(e)=>{setRegisterPassword(e.target.value); handleRegisterfix()}} />
          <input className='password' ref={wrongRegConfirm} type="password"  required  name='confirm-password' id='confirm-password' placeholder='Confirm your password' onChange={(e)=>{setRegisterConfirm(e.target.value);handleRegisterfix()}}/>
          <button className='sign-button'>Create account</button>
        </form>
      </div>
      <hr/>
      <div className='reg-container'>
        <span className='reg-account'>You have an account?</span>
        <button className='get-started' onClick={startedHandeler}>Sign in here</button>
      </div> 

    </div>

  </div>
  </div>
  )
}
