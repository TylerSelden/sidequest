import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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


const QuestCard = ({ quest }) => {
  let { tag, description } = quest;
  const { color, long} = tagData[tag];

  const [completed, setCompleted] = useState(quest.completed);
  const [useAnimation, setUseAnimation] = useState(true);
  const [disableClick, setDisableClick] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUseAnimation(false);
    }, 800);
  }, []);

  let holdTimeout;

  const handleHoldStart = (e) => {
    e.target.innerText = "Hold to undo";
    e.target.classList.add("undo");
    holdTimeout = setTimeout(() => {
      API.local.setQuestCompletion(quest.id, false);
      setCompleted(false);
      if (!e.type.startsWith("touch")) setDisableClick(true);
    }, 3000);
  };
  const handleHoldEnd = (e) => {
    clearTimeout(holdTimeout);
    e.target.innerText = "Completed";
    e.target.classList.remove("undo");
  }

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
          {
            !completed ? (
              <button
                className="btn rounded-pill px-3 btn-sm mb-0 text-light"
                style={{ backgroundColor: color }}
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
                onMouseLeave={handleHoldEnd}
                onTouchStart={handleHoldStart}
                onTouchEnd={handleHoldEnd}
              >
                Completed
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
