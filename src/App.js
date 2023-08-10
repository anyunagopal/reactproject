import React, { useState } from "react";
import SignUp from "./components/SignUp";
import StudentDetails from "./components/StudentDetails";
import "./App.css";

function App() {
  const [modified, setIsModified] = useState("");
  return <div className="mainContainer">
    <SignUp handleCreate={setIsModified} />
    <StudentDetails modified={modified} />
  </div>
}

export default App;