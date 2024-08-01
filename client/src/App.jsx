import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import Tasks from "./pages/tasks"
export default function App (){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element= {<Tasks></Tasks>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}