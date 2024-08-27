import React from "react";
import { useState } from "react";
import arrowRight from "../../../../assets/images/arrowRight.png";

export default function TomorrowTasks({ tomorrowTasks, checkHandler, handleArrowClick,  handleExpantion, expandedTaskId }) {
  const [checkedTasks, setCheckedTasks] = useState({});
  const handleCheck = (e, taskID) => {
    e.stopPropagation();

    const isChecked = e.target.checked;
    setCheckedTasks((prevCheckedTasks) => ({
      ...prevCheckedTasks,
      [taskID]: isChecked,
    }));
  };
  
  return (
    <div className='tasks-list'>
      {tomorrowTasks.map((value) => (
        <div 
        className={`tasks ${expandedTaskId === value.taskID ? "expanded-task" : ""} ${value.status === "completed" ? "completed-task" : ""}`} 
        key={value.taskID} >
          <div className='checker'>
            <input
              type='checkbox'
              id={value.taskID}
              defaultChecked={value.status === "completed" || checkedTasks[value.taskID]}
              onClick={(e) => {handleCheck(e,value.taskID); checkHandler(e, value); }}
              className='check-input'
            />
            <label htmlFor={value.taskID} className='checkbox'>
              <svg viewBox='0 0 22 16' fill='none'>
                <path d='M1 6.85L8.09677 14L21 1' />
              </svg>
            </label>
          </div>
          <div className="task-info" onClick={(e) => {handleExpantion(value.taskID); e.stopPropagation()}}>
            <div className='tasks-title'>{value.title} </div>
            <div className='tasks-description'>{value.description}</div>
          </div>
          <div>
            <img
              src={arrowRight}
              onClick={(e) => { e.stopPropagation(); handleArrowClick(value); }}
              alt='arrowRight'
              className='tasks-arrow'
            />
          </div>
        </div>
      ))}
    </div>
  );
}
