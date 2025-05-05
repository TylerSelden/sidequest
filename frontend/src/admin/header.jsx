import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <div className="mt-4">
      <h1 className="mb-0 text-center title-font neon fs-9">
        <span className="title-font text-primary">Admin</span> Panel
      </h1>
      <p className="text-center"><i className="text-secondary mx-2 fs-2">API Endpoint Manager</i></p>
    </div>
  );
}

export default Header;
