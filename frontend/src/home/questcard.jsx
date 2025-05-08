import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

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
  const [liked, setLiked] = useState(quest.liked);
  const prevLiked = useRef(liked);

  useEffect(() => {
    API.remote.postLike(quest.id, liked - prevLiked.current);
    prevLiked.current = liked;
  }, [liked, quest.id]);

  return (
    <div className="d-flex justify-content-center flex-grow-1">
      <div className="d-flex justify-content-center gap-1">
        <button
          title="Like"
          className="btn btn-dark text-secondary rounded-pill p-0 d-flex justify-content-center align-items-center"
          style={{ width: "28px", height: "28px", fontSize: "20px" }}
          onClick={() => {
            if (liked > 0) {
              API.local.removeLike(quest.id);
              setLiked(0);
            } else {
              API.local.setLike(quest.id, 1);
              setLiked(1);
            }
          }}
        >
          { liked > 0 ? <BiSolidLike /> : <BiLike /> }
        </button>
        <button
          title="Dislike"
          className="btn btn-dark text-secondary rounded-pill p-0 d-flex justify-content-center align-items-center"
          style={{ width: "28px", height: "28px", fontSize: "20px" }}
          onClick={() => {
            if (liked < 0) {
              API.local.removeLike(quest.id);
              setLiked(0);
            } else {
              API.local.setLike(quest.id, -1);
              setLiked(-1);
            }
          }}
        >
          { liked < 0 ? <BiSolidDislike /> : <BiDislike /> }
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
    e.target.innerText = "Hold to Undo";
    e.target.classList.add("undo");
    holdTimeout = setTimeout(() => {
      API.local.setQuestCompletion(quest.id, false);
      setCompleted(false);
      API.remote.postCompleted(quest.id, false);
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
        API.remote.postCompleted(quest.id, true);
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
            <p className="fs-1 text-secondary hyphen-wrap mb-1">{ description }</p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end">
          <p className="text-secondary fs-1 mb-1">{ long }</p>
          <div className="d-flex flex-column gap-2 justify-content-center">
            <VoteButtons quest={quest} />
            <FinishedButton quest={quest} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
