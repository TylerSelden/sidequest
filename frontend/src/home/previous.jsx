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
        <QuestCard tag="Nature" description="Find a secluded place outdoors and just sit there for a while." />
        <QuestCard tag="Exploration" description="Ride an elevator to the highest floor it allows, then explore the hallway." />
        <QuestCard tag="Puzzle" description="Search for a piece of graffiti that seems like a clue or hidden message." />
        <QuestCard tag="Social" description="Compliment someone on something specific and unusual." />
        <QuestCard tag="Observation" description="Photograph a surface with three or more textures clashing." />
        <QuestCard tag="Creativity" description="Make a sketch of something in nature." />
        <QuestCard tag="Physical" description="Climb onto a structure or platform and take a mental snapshot." />
        <QuestCard tag="Miscellaneous" description="Watch something until it moves—flag, sign, paper, shadow." />
        <QuestCard tag="Challenge" description="Pretend you’re a character on a mission and perform a task in a place you’ve never been before." />

        <div className="col-12 pt2 d-flex justify-content-center">
          <button className="btn btn-primary btn-md px-5">Show more</button>
        </div>
      </div>
    </div>
  );
}

export default Previous;
