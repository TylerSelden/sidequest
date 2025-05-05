import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import API from "./api";

import Home from "./home/home";
import Terms from "./terms/terms";
import Admin from "./admin/admin";
import { setQuestData } from "./global";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      API.local.initialize();
      const res = await API.remote.getQuests();
      setQuestData(res);

      setLoaded(true);
    }
    load();
  }, []);
  return (
    <BrowserRouter basename="/sidequest">
      {!loaded ? (
        <div className="position-absolute top-0 start-0 w-100 vh-100 overflow-hidden">
          <div className="position-absolute top-50 start-50 translate-middle">
            <h2>Loading...</h2>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={ <Home /> }></Route>
          <Route path="/terms" element={ <Terms /> }></Route>
          <Route path="/admin" element={ <Admin /> }></Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <App />
)
