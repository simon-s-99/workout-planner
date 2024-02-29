import type { Settings, Unit } from "../types";

interface UnitsPickerProps {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const UnitsPicker: React.FC<UnitsPickerProps> = ({ setSettings }) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // Set the trainingGoal to the radio button's value, leave the rest of the object
    setSettings((current) => ({
      ...current,
      units: e.target.value as Unit,
    }));
  }
  return (
    <div className="UnitsPicker">
      <label>
        <input
          type="radio"
          name="weightUnits"
          value="kilograms"
          defaultChecked
          onChange={(e) => handleChange(e)}
        />
        Kilograms
      </label>
      <label>
        <input type="radio" name="weightUnits" value="pounds" onChange={(e) => handleChange(e)} />
        Pounds
      </label>
    </div>
  );
};

export default UnitsPicker;
