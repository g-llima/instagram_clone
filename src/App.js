import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import FrontPage from "./Pages/FrontPage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  const [contextValue, setContextValue] = useState("");

  return (
    <>
      <UserContext.Provider value={{ contextValue, setContextValue }}>
        <Routes>
          <Route path="*" element={<FrontPage />} />
          <Route exact path="/" element={<FrontPage />} />
          <Route exact path="/accounts/login" element={<Login />} />
          <Route exact path="/accounts/signup" element={<SignUp />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
