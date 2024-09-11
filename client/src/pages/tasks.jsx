import React, { useEffect, useState } from "react";
import Tasks from "../components/tasks/tasks/tasks.jsx";
import NavBar from "../components/tasks/navbar/navbar.jsx";
import NewTask from "../components/tasks/newTask/newTask.jsx";
import User from "../components/tasks/user/user.jsx";

export default function tasks (){
  const [reload, setReload] = useState(0);

  const refresh = (num) =>{
    setReload(num);
  }
  return(
    <div>
      <NavBar></NavBar>
      <Tasks reload={reload} refresh={refresh}></Tasks>
      <NewTask reload={reload} refresh={refresh}></NewTask>
      <User></User>

    </div>
  );
}