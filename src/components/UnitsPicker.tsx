import type { Settings, Unit } from "../types";

interface UnitsPickerProps {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const UnitsPicker: React.FC<UnitsPickerProps> = ({ setSettings }) => {
  const styles = {
    main: {
      display: "inline-block",
      border: "1px solid rgb(165, 165, 165)",
      borderRadius: "5px",
      padding: "1rem",
    },
    label: {
      padding: "1rem",
    },
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // Set the trainingGoal to the radio button's value, leave the rest of the object
    setSettings((current) => ({
      ...current,
      units: e.target.value as Unit,
    }));
  }
  return (
    <div className="UnitsPicker" style={styles.main}>
      <label style={styles.label}>
        <input type="radio" name="weightUnits" value="kilograms" defaultChecked onChange={(e) => handleChange(e)} />
        Kilograms
      </label>
      <label style={styles.label}>
        <input type="radio" name="weightUnits" style={styles.label} value="pounds" onChange={(e) => handleChange(e)} />
        Pounds
      </label>
    </div>
  );
};

export default UnitsPicker;
