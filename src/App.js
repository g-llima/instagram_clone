import "./App.css";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./Pages/FrontPage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<FrontPage />} />
        <Route exact path="/" element={<FrontPage />} />
        <Route exact path="/accounts/login" element={<Login />} />
        <Route exact path="/accounts/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
