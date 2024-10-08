import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./tasks.css";
import TodayTasks from "./today/today.jsx";
import TomorrowTasks from "./tomorrow/tomorrow.jsx";
import ThisWeekTasks from "./week/week.jsx";
import PendingTasks from "./pending/pending.jsx";
import SideTask from './sideTask/sideTask.jsx';
import { Toaster } from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
export default function Tasks({reload, refresh}) {
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

  
 

  let userWelcome = useRef(null);
  let sideDefault = useRef(null);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://flanstdl.onrender.com/card/getCards",{},{
          withCredentials: true
        });
        setListOfCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    const fetchCookie = async () => {
      try {
        const response = await axios.post("https://flanstdl.onrender.com/user/userCookie",{},{
          withCredentials: true
        });
        if(response.data === "unauthorized"){
          window.location.href = "/";
        }
      } catch (error) {
        console.error("No token:", error);
      }
    };
    const fetchUser = async () => {
      try {
        const response = await axios.post("https://flanstdl.onrender.com/user/userCard",{},{
          withCredentials: true
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if(reload==0){
      fetchUser();
      fetchCookie();
      fetchData();
    }
    else{
      refresh(0);
    }
  }, [reload]);


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
      axios.post("https://flanstdl.onrender.com/card/statusCard",data).then((response)=>{
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
    refresh(1);
  }
  const handleExpantion = (taskID) =>{
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskID ? null : taskID));
  }
  const handleDeleteTask = (taskID) => {
    setListOfCards(prevTasks => prevTasks.filter(listOfCards => listOfCards.taskID !== taskID));
    handleTasks();
  };
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

      <SideTask selectedTask={selectedTask} setSelectedTask={setSelectedTask} handleTaskBack={handleTaskBack} count={count} setCount={setCount} handleDeleteTask={handleDeleteTask} ></SideTask>
      
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
