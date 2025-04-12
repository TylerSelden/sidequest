import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./header";
import Current from "./current";
import Previous from "./previous";
import { Footer } from "../global";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <Current />
        <Previous />
      </div>
        <Footer />
    </>
  );
}

export default Home;
