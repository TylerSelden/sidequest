import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import QuestCard from "./questcard";
import { tagData } from "../global";

import { PiCastleTurretFill } from "react-icons/pi";

const TagSelector = () => {
  const [activeTag, setActiveTag] = useState("All Quests");
  return (
    <div className="container my-3 mx-0 pb-3 mb-0 d-flex gap-2 flex-row overflow-auto text-nowrap text-light">
      {Object.entries(tagData).map(([tag, data]) => {
        return (
          <button
            key={tag}
            className="btn text-light rounded-pill btn-md m-0 d-flex align-items-center gap-2"
            style={{ backgroundColor: activeTag === tag ? data.color : "#1e293b" }}
            onClick={() => { setActiveTag(tag); console.log(data) }}
          >
            { tagData[tag].icon }
            {tag}
          </button>
        )
      })}
    </div>
  );
}

const Previous = () => {
  return (
    <div className="mt-5 w-100">
      <h2 className="mt-5 mb-0 title-font text-primary fs-7 d-flex align-items-center">
        <PiCastleTurretFill className="me-2" />
        Previous Quests
      </h2>

      <TagSelector />

      <div className="mt-0 row row-cols-3 row-cols-md-1 g-3 justify-content-center">
        <QuestCard title="Tests and Trial Runs" description="This is an example of a quest. Sit around and enjoy the view for a while, :D - Okay, good enough for me." tag="Exploration"/>
        <QuestCard title="Test" description="This is a test" tag="Social"/>
        <QuestCard title="Test" description="This is a test" tag="Exploration"/>
        <QuestCard title="Test" description="This is a test" tag="Exploration"/>
        <QuestCard title="Test" description="This is a test" tag="Exploration"/>
        <QuestCard title="Test" description="This is a test" tag="Exploration"/>
        <div className="col-12 pt2 d-flex justify-content-center">
          <button className="btn btn-primary btn-md px-5">Show more</button>
        </div>
      </div>
    </div>
  );
}

export default Previous;
