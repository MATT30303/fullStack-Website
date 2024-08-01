import React from 'react'
import { useEffect, useState, useRef } from 'react';
import "./sign.css"
export default function Sign() {
  let switcher = useRef(null);
  let signIn = useRef(null);
  let textContainer = useRef(null);
  let register = useRef(null);

  const [count, setCount] = useState(1);
  const [signChange, setSignChange] = useState (""); 
  const startedHandeler = () =>{
    if(count === 1){
      console.log(count)
      switcher.current.className="all-container-register";
      signIn.current.className="signin-none";
      textContainer.current.className="text-container-right";
      register.current.className="register-show"
      setCount(2);
    }if(count === 2){
      console.log(count)

      switcher.current.className="all-container-sign";
      signIn.current.className="signin-show";
      textContainer.current.className="text-container";
      register.current.className="register-none"
      setCount(1);
    }
  }

/*

<div className='signin' ref={signIn}> 
      <div className='sign-container' >
        <span className="title">Sign in to WTM</span>
        <span className="sign-text">Enter your account details below</span>
        <form action="" className="sign-account">
          <input className='email' type="text" name="email" id="email" placeholder='Email Adress'/>
          <input className='password' type="password" name='password' id='password' placeholder='Password' />
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
    
*/
  return (
  <div>
    <div  className='text-container' ref={textContainer}>
        <span className='bg-title'>Flan's To-Do List</span>
        <span className='bg-description'>A place to set up and manage your daily tasks!</span>
        <span className='bg-dev'>&copy; Matt-dev</span>
      </div>

  <div className='all-container' ref={switcher}>
    
    
<div className='signin' ref={signIn}> 
      <div className='sign-container' >
        <span className="title">Sign in to Flan's</span>
        <span className="sign-text">Enter your account details below</span>
        <form action="" className="sign-account">
          <input className='email' type="text" name="email" id="email" placeholder='Email Adress'/>
          <input className='password' type="password" name='password' id='password' placeholder='Password' />
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
        <span className="register-text">Complete with your details below!</span>
        <form action="" className="register-account">
          <input className='email' type="text" name="email" id="email" placeholder='Email Adress'/>
          <input className='firstName' type="text" name='firstName' id='firstName' placeholder='First Name'/>
          <input className='lastName' type="text" name='lastName' id='lastName' placeholder='Last Name'/>
          <input className='username' type="text" name='username' id='username' placeholder='Username'/>
          <input className='password' type="password" name='password' id='password' placeholder='Password' />
          <input className='password' type="password" name='confirm-password' id='confirm-password' placeholder='Confirm your password' />
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
