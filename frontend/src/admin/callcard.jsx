import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import API from "../api";
import { callData } from "../global";

const IconCircle = ({ color, icon }) => {
  return (
    <div className="text-light rounded-circle d-flex justify-content-center align-items-center" style={{width: "40px", height: "40px", aspectRatio: "1/1", fontSize: "25px", backgroundColor: color }}>
      { icon }
    </div>
  )
}

const DataInput = ({ name, id, type, description }) => {
  return (
    <div className="d-flex flex-column col-12 col-md-11 mb-3">
      <label htmlFor={ id } className="text-secondary mb-2">{ name } ({ type })</label>
      { type === "json" ? (
        <textarea
          type="text"
          className="form-control bg-dark text-light"
          id={ id }
          placeholder={ description }
          rows="6"
        ></textarea>
    ) : (
      <input
        type={ type === "number" ? "number" : "text" }
        className="form-control bg-dark text-light"
        id={ id }
        placeholder={ description }
      />
    )}
    </div>
  )
}

const CallCard = ({ call }) => {
  const callFunc = API.remote[call];
  const { type, url, description, params } = API.remoteMetadata[call];
  const { color, long, icon } = callData[type];

  return (
    <div className="col-12">
      <div className="hover-up card quest-card border-1 rounded mx-auto bg-dark text-light p-3 h-100 justify-content-between" style={{ borderColor: "#334155"}}>
        <div className="d-flex align-items-start gap-3">
          <IconCircle color={ color } icon={ icon } />
          <div className="d-flex flex-column">
            <h3 className="mt-2 h5 fw-bold mb-1">{ call }: { url }</h3>
            <p className="fs-1 text-secondary hyphen-wrap mb-0">{ description }</p>
          </div>
        </div>

        <div className="row gap-2 my-5 justify-content-center">
          { Object.entries(params).map(([name, data]) => {
            const id = `${call}-${name}`;
            const { type, description, required } = data;

            return (
              <DataInput
                key={ id }
                name={ name }
                id={ id }
                type={ type }
                description={ description }
              />
            )
          })}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <p className="text-secondary fs-1 mb-0">{ long }</p>
          <button
            className="btn rounded-pill px-3 btn-sm mb-0 text-light"
            style={{ backgroundColor: color }}
            onClick={() => {
              alert("placeholder")
            }}
          >
            { type }
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallCard;
