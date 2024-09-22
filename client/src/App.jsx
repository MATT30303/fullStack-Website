import {BrowserRouter, Routes, Route} from "react-router-dom";
import TasksPage from "./pages/tasks"
import Landing from "./pages/landing"
export default function App (){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element= {<Landing></Landing>}></Route>
          <Route path="Tasks" element= {<TasksPage></TasksPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}