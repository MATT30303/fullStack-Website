import React, { useEffect, useState } from "react";
import Tasks from "../components/tasks/tasks/tasks.jsx";
import NavBar from "../components/tasks/navbar/navbar.jsx";
import NewTask from "../components/tasks/newTask/newTask.jsx"
import User from "../components/tasks/user/user.jsx"

export default function tasks (){
  return(
    <div>
      <NavBar></NavBar>
      <Tasks></Tasks>
      <NewTask></NewTask>
      <User></User>

    </div>
  );
}