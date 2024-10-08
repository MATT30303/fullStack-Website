import { useEffect, useRef, useState } from 'react'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import "./sideTask.css"
import PropTypes from 'prop-types';
// eslint-disable-next-line react/prop-types
export default function SideTask({selectedTask, setSelectedTask , handleTaskBack, count, setCount, handleDeleteTask}) {

  let sideTask = useRef(null);
  

  const[sidetaskID, setTaskID] = useState('');
  const [sidetitle, setTitle] = useState('');
  const [sidedescription, setdescription] = useState('');
  const[sidestatus, setstatus] = useState('');
  const[sidepriority, setpriority] = useState('');
  const [sidecategory, setcategory] = useState('');
  const[sidedate, setdate] = useState('');
  const[sidehour, sethour] = useState('');
  const [sideupdatedAt, setupdatedAT] = useState('');
  

  const handleBack = () =>{
    sideTask.current.className="side-container-task-none";
    setCount(0);
  }
  useEffect(()=>{
    if(count == 1){
      sideTask.current.className="side-container-task";

      let currentDate = new Date().toJSON().slice(0, 10);
      setTaskID(selectedTask.taskID);
      setTitle(selectedTask.title);
      setdescription(selectedTask.description);
      setstatus(selectedTask.status);
      setpriority(selectedTask.priority);
      setcategory(selectedTask.category);
      setdate(selectedTask.dueDate);
      sethour(selectedTask.dueTime);
      setupdatedAT(currentDate);
    }
  },[count])

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
    
    const toastId = toast.loading('Updating...');
    try{
      axios.post("https://flanstdl.onrender.com/card/updateCard",data).then((response)=>{
        if(response.data === "incorrect"){
          toast.error("Something went wrong. Try again later",{
            id: toastId,
          })
        }else{
          handleBack();
          handleTaskBack();
          toast.success('Updated successfully', {
            id: toastId,
          });
        }
      })
    }catch (error) {
      toast.error("Something went wrong. Try again later",{
        id: toastId,
      })
    }
       
    
  }
  const handleDelete = () =>{
    const toastId = toast.loading('Deleting...');
    const data= {
      taskID: sidetaskID
    }
    if(confirm("You are about to delete this task completly. \n Are you sure?")){
      try{ 
        axios.post("https://flanstdl.onrender.com/card/deleteCard",data).then((response)=>{
          if(response.data === "incorrect"){
            toast.error("Something went wrong. Try again later",{
              id: toastId,
            })
          }else{
            handleBack();
            handleTaskBack();
            handleDeleteTask(sidetaskID);
            toast.success('Deleted successfully', {
            id: toastId,
          });
          }
          
        })
      }catch (error) {
        console.error("Error updating:", error);
      }
    }else{
      toast.dismiss({od: toastId});
    }
  }

  return (
    
    <div className='side-container-task-none' ref={sideTask} >
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
        <button className="side-back" onClick={()=>{handleBack(); handleTaskBack()}}>X</button>
        <div className="side-data">
        <span className='side-title'>Task</span>
        
        <label htmlFor="side-subtitle" className="side-subtitle">Title:<input type="text" name="side-subtitle" className="side-subtitle-box" value={selectedTask?.title || ''}onChange={(e)=>{setTitle(e.target.value); selectedTask.title= e.target.value}}/></label>
        
        <label htmlFor="priority" className="side-priority">Priority:
            <select
              name="priority"
              className="select-priority"
              value={selectedTask?.priority  || ""}
              onChange={(e) => {
                const newPriority = e.target.value;
                selectedTask.priority = e.target.value;
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
              className="select-status"
              value={selectedTask?.status || ""}
              onChange={(e) => {
                const newStatus = e.target.value;
                selectedTask.status = e.target.value;
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
              className="select-category"
              value={selectedTask?.category || ""}
              onChange={(e) => {
                const newCategory = e.target.value;
                selectedTask.category = e.target.value;
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

          
          <label htmlFor="date" className="side-date">Date:<input type="date" name="date" className="side-date-box" defaultValue={selectedTask?.dueDate || ""} onChange={(e)=>{setdate(e.target.value); selectedTask.dueDate = e.target.value}}/></label>
          <label htmlFor="hour" className="side-hour">Hour:<input type="time" name="hour" className="side-hour-box" defaultValue={selectedTask?.dueTime || ""} onChange={(e)=>{sethour(e.target.value); selectedTask.dueTime = e.target.value}}/></label>
          
          <label htmlFor="description" className="side-desc">Description: <textarea name="description" id="description" className="side-desc-area" defaultValue={selectedTask?.description || ""}onChange={(e)=>{setdescription(e.target.value); selectedTask.description = e.target.value}} ></textarea></label>
        </div>
        <div className="side-buttons">
          <button className="side-button" onClick={handleDelete}>Delete</button>
          <button className="side-button" onClick={handleUpdate}>Update</button>
        </div>
      </div>

    )
}
SideTask.propTypes = {
  selectedTask: PropTypes.shape({
    taskID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,  // Si puede ser string o número
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,  // Asume que es una fecha en formato string
    dueTime: PropTypes.string.isRequired,  // Asume que es un string
  }).isRequired,
};