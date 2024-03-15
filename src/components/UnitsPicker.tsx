import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import type { Unit, WeekdayExerciseMap, ExerciseObject, Weekday } from "../types";
import "../stylesheets/UnitsPicker.css";

// this component allows the user to toggle and update their inputted
// weight values in real time, changing them from kg to lbs or vice versa 

interface UnitsPickerProps {
  setWeightUnits: React.Dispatch<React.SetStateAction<Unit>>;
  getExerciseData: () => void;
}

const UnitsPicker: React.FC<UnitsPickerProps> = ({ setWeightUnits, getExerciseData }) => {
  // converts numeric value of kg to lbs
  const kgToLbs = (weightInKg: number) => {
    return Math.round(((weightInKg * 2.20462262) * 100) / 100);
  }

  // converts numeric value of lbs to kg
  const lbsToKg = (weightInLbs: number) => {
    return Math.round(((weightInLbs * 0.45359237) * 100) / 100);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const selectedUnit: Unit = e.target.value as Unit;

    // Set the trainingGoal to the radio button's value
    setWeightUnits(selectedUnit);

    // retrieves all exercises of the week and store them in a data type that we
    // can later pass to one of the local storage writing hooks (overwrite/write)
    const weekdayExerciseMap: WeekdayExerciseMap = new Map<Weekday, ExerciseObject[]>([
      ["Monday", useLocalStorageRead("Monday")],
      ["Tuesday", useLocalStorageRead("Tuesday")],
      ["Wednesday", useLocalStorageRead("Wednesday")],
      ["Thursday", useLocalStorageRead("Thursday")],
      ["Friday", useLocalStorageRead("Friday")],
      ["Saturday", useLocalStorageRead("Saturday")],
      ["Sunday", useLocalStorageRead("Sunday")],
    ]);

    // convert from/to kilograms
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

    // overwrite the entire weeks exercises with the updated weight values
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