import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadData from './loadData';
import Calendars from "./calendars";
import Login from "./login";
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loadData" element={<LoadData />} />
          <Route path="/calendars" element={<Calendars />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
