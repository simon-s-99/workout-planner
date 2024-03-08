import React, { useState, CSSProperties } from "react";

const ConfirmDialog: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => {
  return (
    <div style={styles.dialog}>
      <p>Are you sure that you want to reset all workout data?</p>
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

const ResetLocalStorage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] =
    useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const handleResetConfirmed = () => {
    try {
      localStorage.clear();
      setFeedback("Week reset successfully.");
      setIsFeedbackDialogOpen(true);
      setTimeout(() => {
        setIsFeedbackDialogOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to reset the week:", error);
      setFeedback("Error resetting the week. See console for details.");
      setIsFeedbackDialogOpen(true);
      setTimeout(() => {
        setIsFeedbackDialogOpen(false);
      }, 3000);
    }
    setIsDialogOpen(false);
  };

  const FeedbackDialog: React.FC<{
    message: string;
  }> = ({ message }) => {
    return (
      <div style={styles.feedbackDialog}>
        <p>{message}</p>
      </div>
    );
  };

  return (
    <div>
      <button style={styles.resetButton} onClick={() => setIsDialogOpen(true)}>
        Reset Week ♻
      </button>
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

export default ResetLocalStorage;
