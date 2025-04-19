import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./header";
import Endpoints from "./endpoints";
import { Footer } from "../global";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <Endpoints />
      </div>
        <Footer />
    </>
  );
}

export default Home;
