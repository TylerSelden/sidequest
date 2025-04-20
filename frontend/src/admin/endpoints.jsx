import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import CallCard from "./callcard";
import API from "../api";

import { BsCloudCheckFill } from "react-icons/bs";
import { HiMiniLockClosed } from "react-icons/hi2";

const Endpoints = () => {
  const [apiKey, setApiKey] = useState(API.local.adminKey);

  return (
    <div className="mt-5 w-100">
      <h2 className="mb-0 title-font text-primary fs-7 d-flex align-items-center">
        <HiMiniLockClosed className="me-2" />
        API Key
      </h2>
      <div className="mt-2 mb-4">
        <input
          type="password"
          className="form-control bg-dark text-light"
          placeholder="Your admin API Key"
          value={ apiKey }
          onChange={ (e) => {
            setApiKey(e.target.value);
            API.local.setAdminKey(e.target.value);
          }}
        />
      </div>


      <h2 className="mt-5 mb-0 title-font text-primary fs-7 d-flex align-items-center">
        <BsCloudCheckFill className="me-2" />
        API Endpoints
      </h2>

      <div className="mt-2 row row-cols-3 row-cols-md-1 g-3 justify-content-center">
        { Object.entries(API.remoteMetadata).map(([index, data]) => (
          <CallCard key={ index } call={ index } data={ data } apiKey={ apiKey } />
        )) }
      </div>
    </div>
  );
}

export default Endpoints;
