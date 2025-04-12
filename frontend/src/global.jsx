import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { PiCastleTurretFill } from "react-icons/pi";
import { FaMapMarkedAlt, FaLeaf, FaComments, FaPaintBrush, FaHiking, FaDiceD6 } from "react-icons/fa";
import { FaBinoculars, FaCameraRetro, FaTrophy } from "react-icons/fa6";
import { HiPuzzlePiece } from "react-icons/hi2";

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
  "Puzzle": { color: "#dc2626", long: "Mystery & Puzzle", icon: <HiPuzzlePiece /> },
  "Miscellaneous": { color: "#0f6b7e", long: "Miscellaneous", icon: <FaDiceD6 /> }
}

const Footer = () => {
  return (
    <div className="mt-5 text-secondary text-center py-4 px-5" style={{ fontSize: "0.8rem", borderTop: "1px solid #334155" }}>
      <p>&copy; 2025 SideQuest, All Rights Reserved</p>
      <p>Remember: adventure responsibly and respect your surroundings</p>
      <p className="mb-0">
        <a href="./" className="mt-0 text-decoration-none text-secondary" style={{ fontSize: "0.75rem" }}>Home</a>
        { " | " }
        <a href="./terms" className="mt-0 text-decoration-none text-secondary" style={{ fontSize: "0.75rem" }}>Terms of Use</a>
      </p>
    </div>
  );
}

export { tagData, Footer };
