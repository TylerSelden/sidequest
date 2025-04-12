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

export { tagData };
