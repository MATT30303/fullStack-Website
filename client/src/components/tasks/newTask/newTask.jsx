import React, { useRef, useState } from 'react'
import axios from "axios"
import "./newTask.css"
export default function newTask() {
  let newTaskTab = useRef(null);
  let error = useRef(null);
  const [userID, setUserID] = useState(1);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [desc, setDesc] = useState('');
  



  const create = () =>{
    const data = {
      userID: userID,
      title: title,
      description: desc,
      status: status, 
      priority: priority,
      category: category,
      dueDate: date,
      dueTime: hour,
    }
    try{
      axios.post("http://localhost:3001/card/createCard",data).then((response)=>{
        if(response.data === "incorrect"){
          error.current.innerHTML="Something went wrong. <br>Please try again later."
        }else{
          error.current.innerHTML="";
          window.location.reload();
        }
      })
    }catch (error) {
      console.error("Error creating:", error);
    }
  }


  return (
   <div id='newTask-tab' className="newTask-tab" ref={newTaskTab} >  
    <div className='newTask-container'>
    <div className="newTask-side-data">
        <span className='newTask-title'>Create</span>
        <span htmlFor="side-subtitle" className="newTask-subtitle">Title: <input type="text" name="newTask-subtitle" className="newTask-subtitle-box" placeholder="- - -" onChange={(e)=>{setTitle(e.target.value)}}/></span>
        
        <label htmlFor="priority" className="newTask-priority">Priority:
            <select
              name="priority"
              className="select-newTask-priority"
              onChange={(e)=>{setPriority(e.target.value)}}
            >
              <option value='' hidden >- - -</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          
          
          <label htmlFor="status" className="newTask-status">Status:
            <select
              name="status"
              className="select-newTask-status"
              onChange={(e)=>{setStatus(e.target.value)}}
            >
              <option value='' hidden >- - -</option>
              <option value="progress">Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label htmlFor="category" className="newTask-category">Category:
            <select
              name="category"
              className="select-newTask-category"
              onChange={(e)=>{setCategory(e.target.value)}}
            >
              <option value='' hidden>- - -</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="family">Family</option>
            </select>
          </label>

          
          <label htmlFor="date" className="newTask-date">Date:<input type="date" name="date" className="newTask-date-box" onChange={(e)=>{setDate(e.target.value)}} /></label>
          <label htmlFor="hour" className="newTask-hour">Hour:<input type="time" name="hour" className="newTask-hour-box" onChange={(e)=>{setHour(e.target.value)}} /></label>
          
          <label htmlFor="description" className="newTask-desc">Description: <textarea name="description" id="description" className="newTask-desc-area" placeholder='- - -'onChange={(e)=>{setDesc(e.target.value)}}></textarea></label>
          <div className="newTask-error" ref={error} ></div>
          <div className="newTask-buttons">
            <a className="newTask-button" href="#">Back</a>
            <a className="newTask-button" href="#" onClick={create}>Create</a>
          </div>
        </div>
    </div>
   </div>
  )
}
