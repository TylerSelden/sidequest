import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { PiPlaceholder } from "react-icons/pi";

import { PiCastleTurretFill } from "react-icons/pi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import { FaBinoculars } from "react-icons/fa6";
import { FaCameraRetro } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { FaHiking } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
import { FaPuzzlePiece } from "react-icons/fa6";
import { FaDiceD6 } from "react-icons/fa";

const tagData = {
  "All Quests": { color: "#0ea5e9", long: "All Quests", icon: <PiCastleTurretFill /> },
  "Exploration": { color: "#2563eb", long: "Exploration", icon: <FaMapMarkedAlt /> },
  "Nature": { color: "#059669", long: "Nature & Outdoor", icon: <FaLeaf /> },
  "Discovery": { color: "#4c1d95", long: "Search & Discovery", icon: <FaBinoculars /> },
  "Observation": { color: "#961dbf", long: "Observation & Photography", icon: <FaCameraRetro /> },
  "Social": { color: "#ca8a04", long: "Social Interaction", icon: <FaComments /> },
  "Creativity": { color: "#db2777", long: "Creativity & Creation", icon: <FaPaintBrush /> },
  "Physical": { color: "#de5706", long: "Physical", icon: <FaHiking /> },
  "Challenge": { color: "#1e775a", long: "Challenge", icon: <FaTrophy /> },
  "Puzzle": { color: "#dc2626", long: "Mystery & Puzzle", icon: <FaPuzzlePiece /> },
  "Miscellaneous": { color: "#0f6b7e", long: "Miscellaneous", icon: <FaDiceD6 /> }
}

export { tagData };
