
import TaskTrackerApp from "./Tracker";
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskTrackerApp />} />
      </Routes>
    </Router>
  );
}

export default App;
