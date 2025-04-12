import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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


const QuestCard = ({ title, description, tag }) => {
  const color = tagData[tag].color;
  const long = tagData[tag].long;
  const [useAnimation, setUseAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUseAnimation(false);
    }, 800);
  }, []);

  return (
    <div className="col-12 col-lg-4">
      <div className={`${useAnimation ? "fade-up" : ""} card quest-card border-1 rounded mx-auto bg-dark text-light p-3 h-100 justify-content-between`} style={{ borderColor: "#334155"}}>
        <div className="d-flex align-items-start gap-3">
          <IconCircle tag={tag} />
          <div className="d-flex flex-column">
            <h3 className="mt-2 h5 fw-bold mb-1">{ title }</h3>
            <p className="fs-1 text-secondary hyphen-wrap">{ description }</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-secondary fs-1 mb-0">{ long }</p>
          <button className="btn rounded-pill px-3 btn-sm mb-0" style={{ backgroundColor: color }}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
