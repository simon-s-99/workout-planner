import React, { useState } from "react";
import type { Weekday, ExerciseObject } from "../types";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import "../stylesheets/ClearDay.css";

const ClearDay: React.FC<{
  getExerciseData: () => void;
  selectedWeekday: Weekday;
}> = ({ getExerciseData, selectedWeekday }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const handleReset = () => {
    useLocalStorageOverwrite(new Map<Weekday, ExerciseObject[]>([[selectedWeekday, []]]));
    setFeedback(`${selectedWeekday} reset successfully.`);
    setTimeout(() => setFeedback(""), 2000);
    getExerciseData(); // Refresh or update data
    setIsDialogOpen(false);
  };

  return (
    <div className="ClearDay">
      <button className="clear-day-button" onClick={() => setIsDialogOpen(true)}>
        Clear day 🚮
      </button>

      {isDialogOpen && (
        <div className="dialog">
          <p>Are you sure you want to reset {selectedWeekday}'s workout data?</p>
          <button onClick={handleReset}>Yes</button>
          <button onClick={() => setIsDialogOpen(false)}>No</button>
        </div>
      )}

      {feedback && (
        <div className="feedback-dialog">
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ClearDay;
