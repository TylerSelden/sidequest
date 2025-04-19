import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import CallCard from "./callcard";
import API from "../api";
import { callData } from "../global";

import { BsCloudCheckFill } from "react-icons/bs";

const Endpoints = () => {
  return (
    <div className="mt-5 w-100">
      <h2 className="mb-0 title-font text-primary fs-7 d-flex align-items-center">
        <BsCloudCheckFill className="me-2" />
        API Endpoints
      </h2>

      <div className="mt-2 row row-cols-3 row-cols-md-1 g-3 justify-content-center">
        { Object.entries(API.remoteMetadata).map(([index, data]) => (
          <CallCard key={ index } call={ index } data={ data } />
        )) }
      </div>
    </div>
  );
}

export default Endpoints;
