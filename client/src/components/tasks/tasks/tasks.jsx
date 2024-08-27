import { useState, useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import "./tasks.css";
import TodayTasks from "./today/today.jsx";
import TomorrowTasks from "./tomorrow/tomorrow.jsx";
import ThisWeekTasks from "./week/week.jsx";
import PendingTasks from "./pending/pending.jsx";
import SideTask from './sideTask/sideTask.jsx'

export default function tasks() {
  const [listOfCards, setListOfCards] = useState([]);
  const [user, setUser] = useState([]);
  const [sideCard, setSideCard] = useState([]);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [WeekTasks, setWeekTasks] = useState([]);
  const [overWeektasks, setOverWeek] = useState([]);
  const [pending, setPending] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const[sidetaskID, setTaskID] = useState('');
  const[sideuserID, setUserID] = useState('');
  const [sidetitle, setTitle] = useState('');
  const [sidedescription, setdescription] = useState('');
  const[sidestatus, setstatus] = useState('');
  const[sidepriority, setpriority] = useState('');
  const [sidecategory, setcategory] = useState('');
  const[sidedate, setdate] = useState('');
  const[sidehour, sethour] = useState('');
  const [sidecreatedAt, setcreatedAt] = useState('');
  const [sideupdatedAt, setupdatedAT] = useState('');



  const [isChecked, setIsChecked] = useState(false)

  let userWelcome = useRef(null);
  let sideTask = useRef(null);
  let sideDefault = useRef(null);
  let sideError = useRef(null);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { userID: 1 };
        const response = await axios.post("http://localhost:3001/card/getcards", data);
        setListOfCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { userID: 1 };
        const response = await axios.post("http://localhost:3001/user/userCard", data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (listOfCards.length > 0) {
      handleTasks();
    }

  }, [listOfCards]);
  useEffect(() => {
    if (user.length > 0) {
      handleHitext();
    }
  }, [user]);

  const handleTasks = () => {
    const today = [];
    const tomorrow = [];
    const week = [];
    const overWeek = [];
    const pending = [];
    listOfCards.forEach((value) => {
      const date = new Date();
      const date2 = new Date(value.dueDate + "T00:00:00");
      const currentDay = date.getDay();
      date.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);

      let time1 = date.getTime();
      let time2 = date2.getTime();

      let Difference_In_Time = time2 - time1;
      let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      if (Difference_In_Days === 0) {
        today.push(value);
      } else if (Difference_In_Days === 1) {
        tomorrow.push(value);
      } else if (Difference_In_Days > 1 && Difference_In_Days <= 7 - currentDay) {
        week.push(value);
      } else if (Difference_In_Days > 7 - currentDay) {
        overWeek.push(value);
      } else if (Difference_In_Days < 0) {
        pending.push(value);
      }
    });
    setTodaysTasks(today);
    setTomorrowTasks(tomorrow);
    setWeekTasks(week);
    setOverWeek(overWeek);
    setPending(pending);
  };
  const handleArrowClick = (value) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    
    setSelectedTask(value); 
    
    setUserID(value.userID);
    setTaskID(value.taskID);
    setTitle(value.title);
    setdescription(value.description);
    setstatus(value.status);
    setpriority(value.priority);
    setcategory(value.category);
    setcreatedAt(value.createdAt);
    setdate(value.dueDate);
    sethour(value.dueTime);
    setupdatedAT(currentDate);

    //sideTask.current.className="side-container-task";
    sideDefault.current.className="side-container-none";


    

  };
  const handleHitext = () => {
    userWelcome.current.innerHTML = "Hi, " + user[0].username;
  };

  const checkHandler = (e, value) => {
    const isChecked = e.target.checked;
    if(isChecked){
      value.status="completed";
    }else{
      value.status="progress";
    }
    
  }
  /*
  const handleUpdate =() =>{
    const data = {
      taskID: sidetaskID,
      title: sidetitle,
      description: sidedescription,
      status: sidestatus,
      priority: sidepriority,
      category: sidecategory,
      dueDate: sidedate,
      dueTime: sidehour,
      updatedAt: sideupdatedAt
    }

    try{
      axios.post("http://localhost:3001/card/updateCard",data).then((response)=>{
        if(response.data === "incorrect"){
          sideError.current.innerHTML="Something went wrong. <br>Please try again later."
        }else{
          sideError.current.innerHTML="";
          window.location.reload();
        }
      })
    }catch (error) {
      console.error("Error updating:", error);
    }
  }
  const handleDelete = () =>{
    const data= {
      taskID: sidetaskID
    }

    if(confirm("Estas a punto de borrar esta tarea. \nEsta seguro de esto?")){
      try{
        axios.post("http://localhost:3001/card/deleteCard",data).then((response)=>{
          if(response.data === "incorrect"){
            sideError.current.innerHTML="Something went wrong. <br>Please try again later."
          }else{
            sideError.current.innerHTML="";
            window.location.reload();
          }
        })
      }catch (error) {
        console.error("Error updating:", error);
      }
    }
    else{

    }
  }
  */
  const handleTaskBack = () =>{
    sideDefault.current.className="side-container";
  }
  const handleExpantion = (taskID) =>{
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskID ? null : taskID));
  }

  /*
  <div className='side-container-task-none' ref={sideTask} >
        <button className="side-back" onClick={(e)=>handleTaskBack()}>X</button>
        <div className="side-data">
        <span className='side-title'>Task</span>
        
        <label htmlFor="side-subtitle" className="side-subtitle">Title:<input type="text" name="side-subtitle" className="side-subtitle-box" defaultValue={selectedTask?.title || ""} onChange={(e)=>{setTitle(e.target.value)}}/></label>
        
        <label htmlFor="priority" className="side-priority">Priority:
            <select
              name="priority"
              className="select-priority"
              value={selectedTask?.priority  || ""}
              onChange={(e) => {
                const newPriority = e.target.value;
                setpriority(e.target.value)
                setSelectedTask((prevTask) => ({
                  ...prevTask,
                  priority: newPriority,
                }));
              }}
            >
              <option value='' hidden >{selectedTask?.priority|| "Select priority"}</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          
          
          <label htmlFor="status" className="side-status">Status:
            <select
              name="status"
              id=""
              className="select-status"
              value={selectedTask?.status || ""}
              onChange={(e) => {
                const newStatus = e.target.value;
                setstatus(e.target.value);
                setSelectedTask((prevTask) => ({
                  ...prevTask,
                  status: newStatus,
                }));
              }}
            >
              <option value='' hidden >{selectedTask?.status|| "Select status"}</option>
              <option value="progress">Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label htmlFor="category" className="side-category">Category:
            <select
              name="category"
              id=""
              className="select-category"
              value={selectedTask?.category || ""}
              onChange={(e) => {
                const newCategory = e.target.value;
                setcategory(e.target.value);
                setSelectedTask((prevTask) => ({
                  ...prevTask,
                  category: newCategory,
                }));
              }}
            >
              <option value='' hidden>{selectedTask?.category || "select category"}</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="family">Family</option>
            </select>
          </label>

          
          <label htmlFor="date" className="side-date">Date:<input type="date" name="date" className="side-date-box" defaultValue={selectedTask?.dueDate || ""} onChange={(e)=>{setdate(e.target.value)}}/></label>
          <label htmlFor="hour" className="side-hour">Hour:<input type="time" name="hour" className="side-hour-box" defaultValue={selectedTask?.dueTime || ""} onChange={(e)=>{sethour(e.target.value)}}/></label>
          
          <label htmlFor="description" className="side-desc">Description: <textarea name="description" id="description" className="side-desc-area" defaultValue={selectedTask?.description || ""}onChange={(e)=>{setdescription(e.target.value)}} ></textarea></label>
          <div className="side-error" ref={sideError}></div>
        </div>
        <div className="side-buttons">
          <button className="side-button" onClick={handleDelete}>Delete</button>
          <button className="side-button" onClick={handleUpdate}>Update</button>
        </div>
      </div>
      
  */

  return (
    <div id="tasks-tab" className='tasks-tab'>
      
      <div className='side-container' ref={sideDefault} >
        <span className='side-title'>Welcome!</span>
        <span className='side-text' ref={userWelcome}></span>
      </div>

      <SideTask selectedTask={selectedTask} setSelectedTask={setSelectedTask} handleTaskBack={handleTaskBack}></SideTask>
      
      <div className='tasks-container'>
        
        <div className='header-container'>
          <div className='header'>Today</div>
          <div className='header'>Tomorrow</div>
          <div className='header'>This week</div>
          <div className='header'>Pending</div>
        </div>

        <div className='list-container'>
          <TodayTasks
            todaysTasks={todaysTasks}
            checkHandler={checkHandler}
            handleArrowClick={handleArrowClick}
            handleExpantion={handleExpantion}
            expandedTaskId={expandedTaskId}
          />
          <TomorrowTasks
            tomorrowTasks={tomorrowTasks}
            checkHandler={checkHandler}
            handleArrowClick={handleArrowClick}
            handleExpantion={handleExpantion}
            expandedTaskId={expandedTaskId}
          />
          <ThisWeekTasks
            WeekTasks={WeekTasks}
            checkHandler={checkHandler}
            handleArrowClick={handleArrowClick}
            handleExpantion={handleExpantion}
            expandedTaskId={expandedTaskId}
          />
          <PendingTasks
            pending={pending}
            overWeektasks={overWeektasks}
            checkHandler={checkHandler}
            handleArrowClick={handleArrowClick}
            handleExpantion={handleExpantion}
            expandedTaskId={expandedTaskId}
          />
        </div>
      </div>
    </div>
  );
}
