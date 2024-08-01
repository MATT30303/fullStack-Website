import { useState, useEffect } from 'react'
import React from "react";
import axios from "axios";
import './App.css'

export default function App (){
  const [listOfCards, setListOfCards] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/card").then((response)=>{
      setListOfCards(response.data);
    })
  },[])
  return(
    <div>BUENARDOPOLIS:

      <div>
        {listOfCards.map((value,key)=>{
          return <div>{value.user}</div>;
        })}
      </div>

    </div>
  );
}