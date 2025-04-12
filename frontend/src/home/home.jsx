import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./header";
import Current from "./current";
import Previous from "./previous";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <Current />
        <Previous />
      </div>
    </>
  );
}

export default Home;
