import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { questData } from "../global";

const Header = () => {
  return (
    <div className="mt-4">
      <h1 className="mb-0 text-center title-font neon fs-9">
        <span className="title-font text-primary">Side</span>Quest
      </h1>
      <p className="text-center"><i className="text-secondary mx-2 fs-2">"{ questData.season.quote }"</i></p>
    </div>
  );
}

export default Header;
