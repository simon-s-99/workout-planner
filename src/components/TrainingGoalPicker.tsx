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
  return (
    <div className="TrainingGoalPicker">
      <label>
        Bodybuilding
        <input
          type="radio"
          name="trainingGoal"
          value="bodybuilding"
          defaultChecked
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Endurance
        <input
          type="radio"
          name="trainingGoal"
          value="endurance"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Strength
        <input
          type="radio"
          name="trainingGoal"
          value="strength"
          onChange={(e) => handleChange(e)}
        />
      </label>
    </div>
  );
};

export default TrainingGoalPicker;
