import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import type { Unit, WeekdayExerciseMap, ExerciseObject, Weekday } from "../types";
import "../stylesheets/UnitsPicker.css";

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
    <div className="UnitsPicker">
      <label>
        <input type="radio" name="weightUnits" value="kilograms" defaultChecked onChange={(e) => handleChange(e)} />
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