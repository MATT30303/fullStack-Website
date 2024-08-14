import React, { useRef, useState } from 'react'

export default function sidebar({task}) {
    if(task.length < 1){
        console.log("entro vacio")
    }else{
        console.log("banqueta", task)
    }
    let sideDefault= useRef(null);
    let userWelcome= useRef(null);
    /*
    
    <div className='side-container-task'>
        <button className="side-back">X</button>
        <span className='side-title'>{task.title}</span>
        <span className='side-subTitle'>Subtitle</span>
        <div className="side-data">
          <span className="side-status">Status:</span>
          <span className="side-priority">Priority</span>
          <span className="side-date">Date:   at:</span>
          <span className="side-desc">Description: </span>
        </div>
        <div className="side-buttons">
          <button className="side-button">Delete</button>
          <button className="side-button">Update</button>
        </div>
      </div>
    */
  return (
    <div className='side-container' ref={sideDefault} >
        <span className='side-title'>Welcome!</span>
        <span className='side-text' ref={userWelcome}></span>
      </div>

  );
}
