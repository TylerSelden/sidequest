import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

import API from "../api";
import { tagData } from "../global";

const IconCircle = ({ tag }) => {
  const color = tagData[tag].color;
  const icon = tagData[tag].icon;

  return (
    <div className="text-light rounded-circle d-flex justify-content-center align-items-center" style={{width: "40px", height: "40px", aspectRatio: "1/1", fontSize: "25px", backgroundColor: color }}>
      { icon }
    </div>
  )
}

const VoteButtons = ({ quest }) => {
  return (
    <div className="d-flex flex-grow-1 flex-center mb-3">
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 ms-1">
        <button
          title="Like"
          className="btn btn-dark text-secondary rounded-pill p-0 d-flex justify-content-center align-items-center"
          style={{ width: "22px", height: "22px", fontSize: "20px" }}
          onClick={() => API.local.setQuestLike(quest.id, true)}
        >
          <FaCaretUp />
        </button>
        <button
          title="Dislike"
          className="btn btn-dark text-secondary rounded-pill p-0 d-flex justify-content-center align-items-center"
          style={{ width: "22px", height: "22px", fontSize: "20px" }}
          onClick={() => API.local.setQuestLike(quest.id, false)}
        >
          <FaCaretDown />
        </button>
      </div>
    </div>
  )
};

const FinishedButton = ({ quest }) => {
  const [completed, setCompleted] = useState(quest.completed);
  const [disableClick, setDisableClick] = useState(false);

  let holdTimeout;
  const handleHoldStart = (e) => {
    e.target.innerText = "Undo";
    e.target.classList.add("undo");
    holdTimeout = setTimeout(() => {
      API.local.setQuestCompletion(quest.id, false);
      setCompleted(false);
      if (!e.type.startsWith("touch")) setDisableClick(true);
    }, 3000);
  }
  const handleHoldEnd = (e) => {
    clearTimeout(holdTimeout);
    e.target.innerText = "Completed";
    e.target.classList.remove("undo");
  }

  return !completed ? (
    <button
      className="btn rounded-pill px-3 btn-sm mb-0 text-light"
      style={{ backgroundColor: tagData[quest.tag].color }}
      onClick={() => {
        if (disableClick) return setDisableClick(false);
        API.local.setQuestCompletion(quest.id, true);
        setCompleted(true);
      }}
    >
      Finish
    </button>
  ) : (
    <button
      className="btn fake-disabled rounded-pill px-3 btn-sm mb-0"
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
    >
      Completed
    </button>
  );
}


const QuestCard = ({ quest }) => {
  let { tag, description } = quest;
  const { long } = tagData[tag];

  const [useAnimation, setUseAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUseAnimation(false);
    }, 800);
  }, []);

  return (
    <div className="col-12 col-lg-4">
      <div className={`${useAnimation ? "fade-up" : "hover-up"} card quest-card border-1 rounded mx-auto bg-dark text-light p-3 h-100 justify-content-between`} style={{ borderColor: "#334155"}}>
        <div className="d-flex align-items-start gap-3">
          <IconCircle tag={ tag } />
          <div className="d-flex flex-column">
            <h3 className="mt-2 h5 fw-bold mb-1">{ tag }</h3>
            <p className="fs-1 text-secondary hyphen-wrap">{ description }</p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <p className="text-secondary fs-1 mb-0">{ long }</p>
          <FinishedButton quest={quest} />
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
