"use client";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./lib/login";
import Loading from "./lib/loading";
import Calendars from "./lib/calendars";

export default function Home() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/calenders" element={<Calendars />} />
          </Routes>
        </Router>
      </>
  );
}