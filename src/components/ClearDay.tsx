import React, { useState, CSSProperties } from "react";
import { Weekday, ExerciseObject } from "../types";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";

const ClearDay: React.FC<{
  getExerciseData: () => void;
  selectedWeekday: Weekday;
}> = ({ getExerciseData, selectedWeekday }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const handleReset = () => {
    useLocalStorageOverwrite(
      new Map<Weekday, ExerciseObject[]>([[selectedWeekday, []]])
    );
    setFeedback(`${selectedWeekday} reset successfully.`);
    setTimeout(() => setFeedback(""), 2000);
    getExerciseData(); // Refresh or update data
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsDialogOpen(true)}
        style={styles.resetDayButton}
      >
        Clear day 🚮
      </button>

      {isDialogOpen && (
        <div style={styles.dialog}>
          <p>
            Are you sure you want to reset {selectedWeekday}'s workout data?
          </p>
          <button
            onClick={handleReset}
            style={{ ...styles.button, ...styles.confirmButton }}
          >
            Yes
          </button>
          <button
            onClick={() => setIsDialogOpen(false)}
            style={{ ...styles.button, ...styles.cancelButton }}
          >
            No
          </button>
        </div>
      )}

      {feedback && (
        <div style={styles.feedbackDialog}>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  dialog: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    zIndex: 100,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },

  resetDayButton: {
    width: "122px",
    height: "60px",
  },

  feedbackDialog: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    zIndex: 105,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },

  closeButton: {
    marginTop: "20px",
  },

  button: {
    margin: "0px",
  },

  resetButton: {
    left: "10px",
    bottom: "20px",
  },

  confirmButton: {},
  cancelButton: {
    marginLeft: "10px",
  },
};

export default ClearDay;
