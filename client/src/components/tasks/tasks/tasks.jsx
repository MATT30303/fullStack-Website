import { useState, useEffect } from 'react'
import React from "react";
import axios from "axios";
import "./tasks.css"

export default function App (){
  const [listOfCards, setListOfCards] = useState([]);

  /*
  useEffect(()=>{
    axios.get("http://localhost:3001/card").then((response)=>{
      setListOfCards(response.data);
    })
  },[])
  
  <div>
        {listOfCards.map((value,key)=>{
          return <div>{value.title}</div>;

        })}
  </div>
 */


  return(
    <div className="tasks-tab">
      
      <div className="side-container">
        <span className="side-title">Welcome!</span>
        <span className='side-text'>Hi, pedro</span>
      </div>
      <div className='tasks-container'>
        <div className="header-container">
          <div className="header">Today</div>
          <div className="header">Tomorrow</div>
          <div className="header">This week</div>
          <div className="header">Pending</div>
        </div>
        <div className='list-container'>
          <div className="tasks-list">
            <div className='today-text'>
              XDD
            </div>
          </div>
          <div className="tasks-list">xd</div>
          <div className="tasks-list">xd</div>
          <div className="tasks-list">xd</div>
        </div>
      </div>


      
    </div>
  );
}