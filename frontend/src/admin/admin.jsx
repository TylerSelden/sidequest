import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import API from "../api";
import Header from "./header";
import Key from "./key";
import Status from "./status";
import Endpoints from "./endpoints";
import { Footer } from "../global";

const Home = () => {
  const [apiKey, setApiKey] = useState(API.local.adminKey);

  return (
    <>
      <Header />
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <div className="w-100">
          <Key apiKey={ apiKey } setApiKey={setApiKey} />
          <Endpoints apiKey={apiKey} />
        </div>
      </div>
        <Footer />
    </>
  );
}

export default Home;
