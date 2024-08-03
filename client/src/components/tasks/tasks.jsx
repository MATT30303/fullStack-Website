import { useState, useEffect } from 'react'
import React from "react";
import axios from "axios";


export default function App (){
  const [listOfCards, setListOfCards] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/card").then((response)=>{
      setListOfCards(response.data);
    })
  },[])
  
  /*
  <div>
        {listOfCards.map((value,key)=>{
          return <div>{value.title}</div>;

        })}
  </div>
 */


  return(
    <div>
PESUUUTII
      
    </div>
  );
}