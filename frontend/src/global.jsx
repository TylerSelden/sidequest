import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { PiCastleTurretFill } from "react-icons/pi";
import { FaMapMarkedAlt, FaLeaf, FaComments, FaPaintBrush, FaHiking, FaDiceD6, FaSearch, FaPlus, FaEdit, FaWrench, FaTrashAlt } from "react-icons/fa";
import { FaBinoculars, FaCameraRetro, FaTrophy } from "react-icons/fa6";
import { HiPuzzlePiece } from "react-icons/hi2";

import API from "./api";

const callData = {
  "GET": { color: "#059669", long: "Retrieve Data", icon: <FaSearch /> },
  "POST": { color: "#4c1d95", long: "Create New Resource", icon: <FaPlus /> },
  "PUT": { color: "#0ea5e9", long: "Overwrite Resource", icon: <FaEdit /> },
  "PATCH": { color: "#ca8a04", long: "Modify Resource", icon: <FaWrench /> },
  "DELETE": { color: "#dc2626", long: "Remove Resource", icon: <FaTrashAlt /> }
}

const tagData = {
  "All Quests": { color: "#0ea5e9", long: "All Quests", icon: <PiCastleTurretFill /> },
  "Exploration": { color: "#2563eb", long: "Exploration", icon: <FaMapMarkedAlt /> },
  "Discovery": { color: "#4c1d95", long: "Search & Discovery", icon: <FaBinoculars /> },
  "Nature": { color: "#059669", long: "Nature & Outdoor", icon: <FaLeaf /> },
  "Observation": { color: "#961dbf", long: "Observation & Photography", icon: <FaCameraRetro /> },
  "Social": { color: "#ca8a04", long: "Social Interaction", icon: <FaComments /> },
  "Creativity": { color: "#db2777", long: "Creativity & Creation", icon: <FaPaintBrush /> },
  "Physical": { color: "#de5706", long: "Physical", icon: <FaHiking /> },
  "Challenge": { color: "#1e775a", long: "Challenge", icon: <FaTrophy /> },
  "Mental": { color: "#dc2626", long: "Mental & Intellectual", icon: <HiPuzzlePiece /> },
  "Miscellaneous": { color: "#0f6b7e", long: "Miscellaneous", icon: <FaDiceD6 /> }
}

const Footer = () => {
  return (
    <div className="mt-5 text-secondary text-center py-4 px-5" style={{ fontSize: "0.8rem", borderTop: "1px solid #334155" }}>
      <p className="fs-2 mb-4"><strong>Season { questData.season.index }:</strong> { questData.season.name }</p>
      <p>&copy; 2025 SideQuest, All Rights Reserved</p>
      <p>Remember: adventure responsibly and respect your surroundings</p>
      <p className="mb-0">
        <Link to="/" className="mt-0 text-decoration-none text-secondary" style={{ fontSize: "0.75rem" }}>Home</Link>
        { " | " }
        <Link to="/terms" className="mt-0 text-decoration-none text-secondary" style={{ fontSize: "0.75rem" }}>Terms of Use</Link>
        { " | " }
        <Link
          className="mt-0 text-decoration-none text-secondary"
          style={{ fontSize: "0.75rem" }}
          onClick={() => {
            if (window.confirm("Are you sure? This action cannot be reversed.")) { 
              localStorage.removeItem("sidequest");
              window.location.reload();
            }
          }}
        >
          Clear local data
        </Link>
      </p>
    </div>
  );
}

let questData = {};

function setQuestData(obj) {
  questData = obj;
  const flattened = { ...questData.current, ...questData.previous };

  for (const id in flattened) {
    let _obj = (questData.current[id] || questData.previous[id]);
    if (API.local.questsCompleted.includes(id)) _obj.completed = true;
    _obj.liked = (API.local.likes[id] === undefined) ? null : API.local.likes[id];
  }
}

export { callData, tagData, Footer, questData, setQuestData };
