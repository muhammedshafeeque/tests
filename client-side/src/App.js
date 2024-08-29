import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routers } from "./constants/Routers";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={routers.SIGNUP} element={<SignUp />} />
        <Route path={routers.LOGIN} exact element={<Login />} />
        <Route path={routers.HOME} element={<Home/>}/>

      </Routes>
    </div>
  );
}

export default App;
