import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import API from "../api";

import { HiServer } from "react-icons/hi";

const Status = () => {
  return (
    <div className="mt-5">
      <h2 className="mt-5 mb-0 title-font text-primary fs-7 d-flex align-items-center">
        <HiServer className="me-2" />
        Server Status
      </h2>
      { /* Will include:
              amount of quests in upcoming, current, and completed (and total)
              amount of days left in the season
              current season (numerical index, name, and quote)
              things for quest likes/dislikes (scores) and how many completed (you decide)

              present all of this with dummy info
      */ }
    </div>
  );
}

export default Status;
