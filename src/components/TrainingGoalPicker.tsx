import type { Settings, TrainingGoal } from "../types";

interface TrainingGoalPickerProps {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const TrainingGoalPicker: React.FC<TrainingGoalPickerProps> = ({ setSettings }) => {
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
        <input
          type="radio"
          name="trainingGoal"
          value="strength"
          defaultChecked
          onChange={(e) => handleChange(e)}
        />
        Bodybuilding
      </label>
      <label>
        <input type="radio" name="trainingGoal" value="cardio" onChange={(e) => handleChange(e)} />
        Cardio
      </label>
      <label>
        <input
          type="radio"
          name="trainingGoal"
          value="powerlifting"
          onChange={(e) => handleChange(e)}
        />
        Powerlifting
      </label>
    </div>
  );
};

export default TrainingGoalPicker;
