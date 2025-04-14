import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import QuestCard from "./questcard";
import { questData } from "../global";

import { FaCalendarDay } from "react-icons/fa6";

const Current = () => {
  return (
    <div className="mt-5 w-100">
      <h2 className="mb-0 title-font text-primary fs-7 d-flex align-items-center">
        <FaCalendarDay className="me-2" />
        Today's Quests
      </h2>

      <div className="mt-2 row row-cols-3 row-cols-md-1 g-3">
        { Object.entries(questData.current).map(([id, quest]) => {
          return (
            <QuestCard
              key={ id }
              quest={ questData.current[id] }
            />
          )
        })}
      </div>
    </div>
  );
}

export default Current;
