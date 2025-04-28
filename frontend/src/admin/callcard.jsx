import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaChevronRight, FaChevronDown } from "react-icons/fa";

import API from "../api";
import { callData } from "../global";

const IconCircle = ({ color, icon }) => {
  return (
    <div className="text-light rounded-circle d-flex justify-content-center align-items-center" style={{width: "40px", height: "40px", aspectRatio: "1/1", fontSize: "25px", backgroundColor: color }}>
      { icon }
    </div>
  )
}

const DataInput = ({ name, formal, id, type, description, required, value, onChange }) => {
  return (
    <div className="d-flex flex-column col-12 col-md-11 mb-3">
      <label htmlFor={ id } className="text-secondary mb-2">{ required ? '*' : '' }{ name } ({ type })</label>
      { type === "json" ? (
        <textarea
          type="text"
          className="form-control bg-dark text-light"
          id={ id }
          placeholder={ description }
          rows="6"
          value={ value }
          onChange={ (e) => onChange(name, e.target.value, true) }
        ></textarea>
    ) : (
      <input
        type={ type }
        className="form-control bg-dark text-light"
        id={ id }
        placeholder={ description }
        value={ value }
        onChange={ (e) => onChange(name, e.target.value) }
      />
    )}
    </div>
  )
}

const ParamList = ({ params, paramValues, onChange }) => {
  return (
    <div className="row gap-2 mt-4 justify-content-center">
      { Object.entries(params).map(([name, data]) => {
        const id = `param-${name}`;
        const { type, description, required } = data;

        return (
          <DataInput
            key={ id }
            name={ name }
            id={ id }
            type={ type }
            description={ description }
            required={ required }
            value={ paramValues[name].value }
            onChange={ onChange }
          />
        )
      })}
    </div>
  );
};

const CallCard = ({ call, data, apiKey }) => {
  const { type, url, privileged, description, params } = data;
  const { color, long, icon } = callData[type];

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [paramValues, setParamValues] = useState(
    Object.fromEntries(Object.entries(params).map(([name, obj]) => {
      const { formal, required, type } = obj;
      return [name, { formal, required, type, value: "" }];
    }))
  );
  const [resValue, setResValue] = useState("");

  const handleInputChange = (key, value, isJSON) => {
    setParamValues(prev => ({ ...prev, [key]: { ...prev[key], value } }));
  };

  const handleCall = async () => {
    if (Object.values(paramValues).some(param => param.required && !param.value)) return alert("Please fill all required parameters.");
    if (privileged && !apiKey) return alert("This call requires admin privileges. Please provide an API key.");
    setResValue("Loading...");

    // if privileged, add apiKey as key as first parameter
    const paramValuesWithKey = Object.entries(privileged ? { key: { value: apiKey }, ...paramValues } : paramValues)
      .reduce((acc, [key, param]) => {
        if (param.type === "json" && param.value !== "") {
          try {
            acc[key] = { ...param, value: JSON.parse(param.value) };
          } catch {
            setResValue(`Local error: Invalid JSON for parameter "${key}"`);
            throw new Error(`Invalid JSON for parameter: "${key}"`);
          }
        } else {
        acc[key] = param;
      }
      return acc;
    }, {});
    const res = await API.remote[call](...Object.values(paramValuesWithKey).map(param => param.value));
 
    setResValue(JSON.stringify(res, null, 2));
  };


  return (
    <div className="col-12">
      <div className="hover-up card quest-card border-1 rounded mx-auto bg-dark text-light p-3 h-100 justify-content-between" style={{ borderColor: "#334155" }}>
        <div className="d-flex align-items-start gap-3">
          <IconCircle color={ color } icon={ icon } />
          <div className="d-flex flex-column">
            <h3 className="mt-2 h5 fw-bold mb-1">{ call }: { url }</h3>
            <p className="fs-1 text-secondary hyphen-wrap mb-0">{ description }</p>
          </div>
          <div className="ms-auto">
            <button
              className="btn rounded-circle p-0"
              style={{ width: "30px", height: "30px", aspectRatio: "1/1", fontSize: "20px", backgroundColor: "#334155" }}
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}
            >
              <span className="d-flex justify-content-center align-items-center">
                { isCollapsed ? <FaChevronRight /> : <FaChevronDown /> }
              </span>
            </button>
          </div>
        </div>

        { isCollapsed ? (
          <></>
        ) : (
          <>
            { Object.keys(params).length > 0 && (
              <>
                <div className="spacer mt-3 mb-3"></div>
                <ParamList params={ params} paramValues={ paramValues } onChange={ handleInputChange } />
              </>
            )}

            <div className="spacer mt-3 mb-4"></div>

            <div className="row gap-2 mb-3 justify-content-center">
              <div className="col-12 col-md-11 mb-3">
                <label htmlFor="response" className="text-secondary mb-2">Response</label>
                <textarea
                  type="text"
                  className="form-control bg-dark text-light"
                  id="response"
                  rows="6"
                  value={ resValue }
                  readOnly
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <p className="text-secondary fs-1 mb-0">{ long }</p>
              <button
                className="btn rounded-pill px-3 btn-sm mb-0 text-light"
                style={{ backgroundColor: color }}
                onClick={ handleCall }
              >
                { type }
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CallCard;
