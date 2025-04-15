import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import QuestCard from "./questcard";
import { tagData, questData } from "../global";

import { PiCastleTurretFill } from "react-icons/pi";

const TagSelector = ({ activeTag, setActiveTag }) => {
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

const filteredList = (activeTag) => {
  return Object.entries(questData.previous)
    .filter(([id, quest]) => activeTag === "All Quests" || quest.tag === activeTag);
}

// Function to display the previous quests
const PreviousQuestCards = ({ activeTag, showCount }) => {
  const filtered = filteredList(activeTag);

  return filtered.length > 0 ? (
    filtered.slice(0, showCount).map(([id, quest]) => (
      <QuestCard key={ `${id}_${activeTag}` } quest={ quest } />
    ))
  ) : (
    <div className="col-12 pt2 d-flex justify-content-center">
      <h2 className="text-secondary fs-3 mt-4">No quests available</h2>
    </div>
  );
}

const Previous = () => {
  const [activeTag, setActiveTag] = useState("All Quests");
  const [showCount, setShowCount] = useState(6);

  return (
    <div className="mt-5 w-100">
      <h2 className="mt-5 mb-0 title-font text-primary fs-7 d-flex align-items-center">
        <PiCastleTurretFill className="me-2" />
        Previous Quests
      </h2>

      <TagSelector activeTag={ activeTag } setActiveTag={ setActiveTag} />

      <div className="mt-0 row row-cols-3 row-cols-md-1 g-3 justify-content-center">
        <PreviousQuestCards activeTag={ activeTag } showCount={ showCount } />

        <div className="col-12 pt2 d-flex justify-content-center">
          <button
            className="btn btn-primary btn-md px-5"
            style={{ display: (showCount < filteredList(activeTag).length) ? "block" : "none" }}
            onClick={() => {
              setShowCount(showCount + 3);
            }}
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Previous;
