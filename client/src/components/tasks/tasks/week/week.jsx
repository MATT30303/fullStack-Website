import React from "react";
import { useState } from "react";
import arrowRight from "../../../../assets/images/arrowRight.png";

export default function ThisWeekTasks({ WeekTasks, checkHandler, handleArrowClick, handleExpantion, expandedTaskId }) {
  const [checkedTasks, setCheckedTasks] = useState({});
  const handleCheck = (e, taskID) => {
    const isChecked = e.target.checked;
    setCheckedTasks((prevCheckedTasks) => ({
      ...prevCheckedTasks,
      [taskID]: isChecked,
    }));

    checkHandler(e, taskID); // Call the checkHandler passed down as props
  };



  

  return (
    <div className='tasks-list'>
      {WeekTasks.map((value) => (
        <div className={`tasks ${checkedTasks[value.taskID] ? "completed-task" : ""} ${expandedTaskId === value.taskID ? "expanded-task" : ""}`} 
        key={value.taskID}>
          <div className='checker'>
            <input
              type='checkbox'
              id={value.taskID}
              onClick={(e) => {checkHandler(e, value); handleCheck(e,value.taskID)}}
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
