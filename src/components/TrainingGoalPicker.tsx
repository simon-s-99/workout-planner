import type { Settings, TrainingGoal } from "../types";

interface TrainingGoalPickerProps {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const TrainingGoalPicker: React.FC<TrainingGoalPickerProps> = ({
  setSettings,
}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // Set the trainingGoal to the radio button's value, leave the rest of the object
    setSettings((current) => ({
      ...current,
      trainingGoal: e.target.value as TrainingGoal,
    }));
  }

  const styles = {
    main: { display: "block", border: "1px solid rgb(165, 165, 165)", borderRadius: "5px", padding: "1rem" },
    label: {
      padding: "1rem",
    },
  };
  return (
    <div className="TrainingGoalPicker" style={styles.main}>
      <label style={styles.label}>
        <input type="radio" name="trainingGoal" value="strength" defaultChecked onChange={(e) => handleChange(e)} />
        Bodybuilding
      </label>
      <label style={styles.label}>
        <input type="radio" name="trainingGoal" value="cardio" onChange={(e) => handleChange(e)} />
        Cardio
      </label>
      <label style={styles.label}>
        <input type="radio" name="trainingGoal" value="powerlifting" onChange={(e) => handleChange(e)} />
        Powerlifting
      </label>
    </div>
  );
};

export default TrainingGoalPicker;
