import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import API from "../api";

import { BiSolidCopy } from "react-icons/bi";
import { HiMiniLockClosed } from "react-icons/hi2";

const Key = ({ apiKey, setApiKey }) => {
  const [clipboardCopied, setClipboardCopied] = useState(false);

  return (
    <div className="mt-5">
      <h2 className="mb-0 title-font text-primary fs-7 d-flex align-items-center">
        <HiMiniLockClosed className="me-2" />
        API Key
      </h2>
      <div className="mt-2 mb-4 d-flex flex-column align-items-end">
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
        <button
          className="btn btn-dark text-secondary p-1 mt-1"
          style={{ fontSize: "17px"}}
          onClick={ () => {
            navigator.clipboard.writeText(apiKey);
            setClipboardCopied(true);
            setTimeout(() => { setClipboardCopied(false) }, 2000);
          }}
        >
          { clipboardCopied ? (
            <>
              Copied!
            </>
          ) : (
            <>
              <BiSolidCopy className="me-1" style={{ fontSize: "20px" }} />
              Copy to clipboard
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Key;
