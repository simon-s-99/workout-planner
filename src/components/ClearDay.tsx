import React, { useState } from "react";
import type { Weekday, ExerciseObject } from "../types";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import "../stylesheets/ClearDay.css";

const ClearDay: React.FC<{
  getExerciseData: () => void;
  selectedWeekday: Weekday;
}> = ({ getExerciseData, selectedWeekday }) => {
  const [isDialogueOpen, setIsDialogueOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const handleReset = () => {
    useLocalStorageOverwrite(new Map<Weekday, ExerciseObject[]>([[selectedWeekday, []]]));
    setFeedback(`${selectedWeekday} reset successfully.`);
    setTimeout(() => setFeedback(""), 2000);
    getExerciseData(); // Refresh or update data
    setIsDialogueOpen(false);
  };

  return (
    <div className="ClearDay">
      <button type="button" className="ClearDayButton" onClick={() => setIsDialogueOpen(true)}>
        Clear day 🚮
      </button>

      {isDialogueOpen && (
        <div className="Dialogue">
          <p>Are you sure you want to reset {selectedWeekday}'s workout data?</p>
          <button type="button" onClick={handleReset}>Yes</button>
          <button type="button" onClick={() => setIsDialogueOpen(false)}>No</button>
        </div>
      )}

      {feedback && (
        <div className="FeedbackDialogue">
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ClearDay;
