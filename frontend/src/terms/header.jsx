import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <div className="mt-4">
      <h1 className="mb-0 text-center title-font neon fs-9">
        <span className="title-font text-primary">Terms</span> of <span className="title-font text-primary">Use</span>
      </h1>
      <p className="text-center"><i className="text-secondary mx-2 fs-2">The Legal Stuff</i></p>
    </div>
  );
}

export default Header;
