import { useState, useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import "./tasks.css";
import TodayTasks from "./today/today.jsx";
import TomorrowTasks from "./tomorrow/tomorrow.jsx";
import ThisWeekTasks from "./week/week.jsx";
import PendingTasks from "./pending/pending.jsx";
import SideTask from './sideTask/sideTask.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default function tasks() {
  const [listOfCards, setListOfCards] = useState([]);
  const [user, setUser] = useState([]);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [WeekTasks, setWeekTasks] = useState([]);
  const [overWeektasks, setOverWeek] = useState([]);
  const [pending, setPending] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(true);

  
 

  let userWelcome = useRef(null);
  let sideDefault = useRef(null);

  

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
    setCount(1);
    setSelectedTask(value); 
    sideDefault.current.className="side-container-none";
  };
  const handleHitext = () => {
    userWelcome.current.innerHTML = "Hi, " + user[0].username;
  };

  const checkHandler = (e, value) => {
    const isChecked = e.target.checked;
    isChecked? value.status="completed" : value.status="progress";
    
    const data={
      taskID: value.taskID,
      status: value.status
    }
    try{
      axios.post("http://localhost:3001/card/statusCard",data).then((response)=>{
        if(response.data === "incorrect"){
          alert("Something went wrong. Please try again later")
        }
      })
    }catch (error) {
      console.error("Error updating:", error);
    }


  }
  const handleTaskBack = () =>{
    sideDefault.current.className="side-container";
    setSelectedTask('');
  }
  const handleExpantion = (taskID) =>{
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskID ? null : taskID));
  }

  return (
    <div id="tasks-tab" className='tasks-tab'>
      <div><Toaster
          toastOptions={{
            className: '',
            style: {
              border: '1px solid #FFB6C1',
              padding: '16px',
              color: '#FAF9F6',
              background: "#2c2c2c",
            },
            error: {
              style: {
                border: '1px solid #F33A6A',
                padding: '16px',
                color: '#FAF9F6',
                background: "#2c2c2c",
              },
        }}}
      /></div>
      
      <div className='side-container' ref={sideDefault} >
        <span className='side-title'>Welcome!</span>
        <span className='side-text' ref={userWelcome}></span>
      </div>

      <SideTask selectedTask={selectedTask} setSelectedTask={setSelectedTask} handleTaskBack={handleTaskBack} count={count} setCount={setCount} setReload={setReload}></SideTask>
      
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
