import React from "react";
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
  "Puzzle": { color: "#dc2626", long: "Mystery & Puzzle", icon: <HiPuzzlePiece /> },
  "Miscellaneous": { color: "#0f6b7e", long: "Miscellaneous", icon: <FaDiceD6 /> }
}

const Footer = () => {
  return (
    <div className="mt-5 text-secondary text-center py-4 px-5" style={{ fontSize: "0.8rem", borderTop: "1px solid #334155" }}>
      <p className="fs-2 mb-4"><strong>Season { questData.season }:</strong> { questData.seasonName }</p>
      <p>&copy; 2025 SideQuest, All Rights Reserved</p>
      <p>Remember: adventure responsibly and respect your surroundings</p>
      <p className="mb-0">
        <a href="./" className="mt-0 text-decoration-none text-secondary" style={{ fontSize: "0.75rem" }}>Home</a>
        { " | " }
        <a href="./terms" className="mt-0 text-decoration-none text-secondary" style={{ fontSize: "0.75rem" }}>Terms of Use</a>
        { " | " }
        <a
          href="./#"
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
        </a>
      </p>
    </div>
  );
}

let questData = {
  current: {
    "ac43ce08-a0c9-4dd7-b7b0-22789414e33f": {
      tag: "Puzzle",
      description: "Find an odd symbol or message written in graffiti.",
      completed: true
    },
    "8ae2adae-caac-4a3b-867b-756a62257e01": {
      tag: "Creativity",
      description: "Write a short poem about something you encounter today.",
      completed: false
    },
    "4be52f1c-65d4-458e-a2c8-c905b473eb45": {
      tag: "Nature",
      description: "Spot a patch of wildflowers growing somewhere unusual.",
      completed: false
    }
  },
  previous: {
    "c07721d4-80a9-4543-91c9-766886bea783": {
      tag: "Nature",
      description: "Find a secluded place outdoors and just sit there for a while.",
      completed: false
    },
    "e4e9e9ef-2a6d-4160-a260-e51002340ccd": {
      tag: "Exploration",
      description: "Ride an elevator to the highest floor it allows, then explore the hallway.",
      completed: false
    },
    "652d200b-2a6d-4ade-9611-012fa2a99970": {
      tag: "Puzzle",
      description: "Search for a piece of graffiti that seems like a clue or hidden message.",
      completed: false
    },
    "385004c0-9a97-4f8b-9377-cec393044cf7": {
      tag: "Social",
      description: "Compliment someone on something specific and unusual.",
      completed: false
    },
    "1203d687-1ce9-46f3-8ec4-8b8fbf2dbe7d": {
      tag: "Observation",
      description: "Photograph a surface with three or more textures clashing.",
      completed: false
    },
    "02a7beb9-7d70-4caf-b0ef-bd5e0364dae9": {
      tag: "Creativity",
      description: "Make a sketch of something in nature.",
      completed: false
    },
    "fd76425c-cdee-4d13-98f6-6a218d4f640f": {
      tag: "Physical",
      description: "Climb onto a structure or platform and take a mental snapshot.",
      completed: false
    },
    "127dc60a-0efd-459d-b72c-0f80e258ccfc": {
      tag: "Miscellaneous",
      description: "Watch something until it moves—flag, sign, paper, shadow.",
      completed: false
    },
    "286025f4-1544-40bd-a19d-bfa98f1699d9": {
      tag: "Challenge",
      description: "Pretend you’re a character on a mission and perform a task in a place you’ve never been before.",
      completed: false
    }
  }
};

function setQuestData(obj) {
  questData = obj;
  for (const id of API.local.questsCompleted) {
    let _obj = (questData.current[id] || questData.previous[id]);
    if (_obj) _obj.completed = true;
  }
}

export { callData, tagData, Footer, questData, setQuestData };
