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
            onClick={() => { setActiveTag(tag) }}
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
    .sort((a, b) => { return a[1].timestamp > b[1].timestamp ? -1 : 1 })
    .filter(([id, quest]) => activeTag === "All Quests" || quest.tag === activeTag);
}

const PreviousQuestCards = ({ activeTag, showCount }) => {
  const filtered = filteredList(activeTag);

  return filtered.length > 0 ? (
    filtered.slice(0, showCount).map(([id, quest]) => (
      <QuestCard key={ `${id}_${activeTag}` } quest={ quest } />
    ))
  ) : (
    <div className="col-12 pt2 d-flex justify-content-center fade-up">
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

        { filteredList(activeTag).length === 0 || showCount >= filteredList(activeTag).length ? null : (
          <div className="col-12 pt2 d-flex justify-content-center">
            <button
              className="btn btn-primary btn-md px-5"
              style={{ display: showCount > 12 ? "none" : "block" }}
              onClick={() => {
                if (showCount >= 12) return setShowCount(filteredList(activeTag).length);
                setShowCount(showCount + 3);
              }}
            >
              Show { showCount >= 12 ? "All" : "More" }
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Previous;
