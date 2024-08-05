import React from "react";
import Tasks from "../components/tasks/tasks/tasks.jsx";
import NavBar from "../components/tasks/navbar/navbar.jsx";
export default function tasks (){

  return(
    <div>
      <NavBar></NavBar>
      <Tasks></Tasks>

    </div>
  );
}