import {BrowserRouter, Routes, Route} from "react-router-dom";
import TasksPage from "./pages/tasks"
import Landing from "./pages/landing"
export default function App (){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element= {<Landing></Landing>}></Route>
          <Route path="tasks" element= {<TasksPage></TasksPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}