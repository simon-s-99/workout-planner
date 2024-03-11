import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { type Unit, type WeekdayExerciseMap, type ExerciseObject, Weekday } from "../types";

interface UnitsPickerProps {
  setWeightUnits: React.Dispatch<React.SetStateAction<Unit>>;
  getExerciseData: () => void;
}

const UnitsPicker: React.FC<UnitsPickerProps> = ({ setWeightUnits, getExerciseData }) => {
  const kgToLbs = (weightInKg: number) => {
    return Math.round(((weightInKg * 2.20462262) * 100) / 100);
  }

  const lbsToKg = (weightInLbs: number) => {
    return Math.round(((weightInLbs * 0.45359237) * 100) / 100);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const selectedUnit: Unit = e.target.value as Unit;

    // Set the trainingGoal to the radio button's value
    setWeightUnits(selectedUnit);

    const weekdayExerciseMap: WeekdayExerciseMap = new Map<Weekday, ExerciseObject[]>([
      ["Monday", useLocalStorageRead("Monday")],
      ["Tuesday", useLocalStorageRead("Tuesday")],
      ["Wednesday", useLocalStorageRead("Wednesday")],
      ["Thursday", useLocalStorageRead("Thursday")],
      ["Friday", useLocalStorageRead("Friday")],
      ["Saturday", useLocalStorageRead("Saturday")],
      ["Sunday", useLocalStorageRead("Sunday")],
    ]);

    if (selectedUnit === "kilograms") {
      weekdayExerciseMap.forEach((exerciseObjects) => {
        exerciseObjects.forEach((exercise) => {
          exercise.sets.forEach((set) => {
            set.weight = lbsToKg(set.weight);
          })
        })
      });
    }
    else {
      weekdayExerciseMap.forEach((exerciseObjects) => {
        exerciseObjects.forEach((exercise) => {
          exercise.sets.forEach((set) => {
            set.weight = kgToLbs(set.weight);
          })
        })
      });
    }

    useLocalStorageOverwrite(weekdayExerciseMap);
    getExerciseData();
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