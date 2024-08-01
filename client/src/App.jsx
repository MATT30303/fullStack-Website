import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import Tasks from "./pages/tasks"
import Landing from "./pages/landing"
export default function App (){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element= {<Landing></Landing>}></Route>
          <Route path="tasks" element= {<Tasks></Tasks>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}