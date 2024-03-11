import React, { useState, CSSProperties } from "react";
import { Weekday } from "../types";

const WeekdaySelector: React.FC<{
  selectedWeekday: Weekday;
  setSelectedWeekday: React.Dispatch<React.SetStateAction<Weekday>>;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ selectedWeekday, setSelectedWeekday, onClose, onConfirm }) => {
  // Renders a dropdown for selecting a day, and confirm and close buttons
  return (
    <div style={{ ...styles.dialog, ...styles.weekdaySelector }}>
      <select
        value={selectedWeekday}
        onChange={(e) => setSelectedWeekday(e.target.value as Weekday)}
        style={styles.select}
      >
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      <button
        onClick={onConfirm}
        style={{ ...styles.button, ...styles.confirmButton }}
      >
        Confirm
      </button>{" "}
      {/* Confirm button */}
      <button onClick={onClose} style={styles.closeButton}>
        Close
      </button>
    </div>
  );
};

const ConfirmDialog: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => {
  return (
    <div style={styles.dialog}>
      <p>
        Are you sure that you want to reset the selected day's workout data?
      </p>
      <button
        style={{ ...styles.button, ...styles.confirmButton }}
        onClick={onConfirm}
      >
        Yes
      </button>
      <button
        style={{ ...styles.button, ...styles.cancelButton }}
        onClick={onCancel}
      >
        No
      </button>
    </div>
  );
};

// ClearDay component provides functionality to clear data of a selected day
const ClearDay: React.FC<{ getExerciseData: () => void }> = ({
  getExerciseData,
}) => {
  // State for controlling dialog and selector visibility, selected weekday, and feedback messages
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isWeekdaySelectorOpen, setIsWeekdaySelectorOpen] =
    useState<boolean>(false); // New state for controlling the visibility of WeekdaySelector
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] =
    useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const handleResetConfirmed = () => {
    try {
      localStorage.removeItem(selectedWeekday); // Removes the data for the selected day
      setFeedback(`${selectedWeekday} reset successfully.`);
      setIsFeedbackDialogOpen(true);
      setTimeout(() => {
        setIsFeedbackDialogOpen(false);
      }, 2000);
      getExerciseData(); // Refresh data on the page
    } catch (error) {
      console.error(`Failed to reset the day: ${selectedWeekday}`, error);
      setFeedback(
        `Error resetting ${selectedWeekday}. See console for details.`
      );
      setIsFeedbackDialogOpen(true);
      setTimeout(() => {
        setIsFeedbackDialogOpen(false);
      }, 3000);
    }
    setIsWeekdaySelectorOpen(false); // Close the selector after confirming
  };

  // FeedbackDialog component displays feedback messages to the user.
  const FeedbackDialog: React.FC<{
    message: string;
  }> = ({ message }) => {
    return (
      <div style={styles.feedbackDialog}>
        <p>{message}</p>
      </div>
    );
  };

  //main render method for ClearDay component
  return (
    <div>
      <button
        style={styles.resetDayButton}
        onClick={() => setIsWeekdaySelectorOpen(true)}
      >
        Reset day 🚮
      </button>

      {isWeekdaySelectorOpen && (
        <WeekdaySelector
          selectedWeekday={selectedWeekday}
          setSelectedWeekday={setSelectedWeekday}
          onClose={() => setIsWeekdaySelectorOpen(false)}
          onConfirm={handleResetConfirmed}
        />
      )}
      {isDialogOpen && (
        <ConfirmDialog
          onConfirm={handleResetConfirmed}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
      {isFeedbackDialogOpen && <FeedbackDialog message={feedback} />}
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
    left: "10px",
    bottom: "20px",
    width: "140px",
    padding: "10px 40px 10px 10px",
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
