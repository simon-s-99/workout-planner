import React, { useState } from "react";
import "./App.css";
import Exercise from "./components/Exercise";
import type { Weekday, ExerciseObject, Unit } from "./types";
import MuscleCategoryList from "./components/MuscleCategoryList";
import WeekdayPicker from "./components/WeekdayPicker";
import { useLocalStorageRead } from "./hooks/useLocalStorageRead";
import PieChart from "./components/PieChart";
import MuscleAnatomyChart from "./components/MuscleAnatomyChart";
import UnitsPicker from "./components/UnitsPicker";
import ClearDay from "./components/ClearDay";

const App: React.FC = () => {
  const [weightUnit, setWeightUnit] = useState<Unit>("kilograms");

  /*
    Change name of this variable
    "data" means nothing in this context 
  */
  const [exerciseData, setExerciseData] = useState<ExerciseObject[]>([]);

  // Currently selected weekday, initialized to "Monday" in case we want a start value.
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");

  // bool to help toggle between the add exercise interface and the main content
  const [showAddExerciseMenu, setShowAddExerciseMenu] =
    useState<boolean>(false);
  let AddExerciseOrGoBackButton: JSX.Element = (
    <label>
      <input
        type="button"
        name={
          showAddExerciseMenu
            ? "GoBackFromExerciseMenuButton"
            : "AddExerciseMenuButton"
        }
        value={showAddExerciseMenu ? "<" : "+"}
        onClick={() => setShowAddExerciseMenu(!showAddExerciseMenu)}
      ></input>
      {/* ^ toggle showAddExerciseMenu to true if it is false and vice versa */}
    </label>
  );

  function getExerciseData(): void {
    const mondayData = useLocalStorageRead("Monday");
    const tuesdayData = useLocalStorageRead("Tuesday");
    const wednesdayData = useLocalStorageRead("Wednesday");
    const thursdayData = useLocalStorageRead("Thursday");
    const fridayData = useLocalStorageRead("Friday");
    const saturdayData = useLocalStorageRead("Saturday");
    const sundayData = useLocalStorageRead("Sunday");

    // Combine all arrays into one
    const exerciseData = mondayData
      .concat(tuesdayData)
      .concat(wednesdayData)
      .concat(thursdayData)
      .concat(fridayData)
      .concat(saturdayData)
      .concat(sundayData);

    setExerciseData(exerciseData);
  }

  return (
    <div className="App">
      <h1>Workout Planner</h1>
      <WeekdayPicker
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={setSelectedWeekday}
      />
      <ClearDay
        getExerciseData={getExerciseData}
        selectedWeekday={selectedWeekday}
      />

      <Exercise
        weightUnit={weightUnit}
        weekday={selectedWeekday}
        exerciseData={exerciseData}
        getExerciseData={getExerciseData}
      />
      <div>
        <h2>Exercises</h2>
        <h3>What is your training goal?</h3>
        <UnitsPicker
          setWeightUnits={setWeightUnit}
          getExerciseData={getExerciseData}
        />
      </div>

      {/* The code below shows the "normal" interface with exercise names,
          sets, reps & weight or the add exercise interface where the user
          can pick exercises to add to their program. (Uses ternary operator for brevity.)*/}
      <main>
        {showAddExerciseMenu ? (
          <div className="AddExerciseMenu">
            {AddExerciseOrGoBackButton}
            <MuscleCategoryList
              weekday={selectedWeekday}
              getExerciseData={getExerciseData}
            />
          </div>
        ) : (
          <div className="AddExerciseMenu">{AddExerciseOrGoBackButton}</div>
        )}
      </main>

      <PieChart exerciseData={exerciseData} getExerciseData={getExerciseData} />

      <MuscleAnatomyChart
        weekday={selectedWeekday}
        weekExerciseListLength={exerciseData.length}
      />
    </div>
  );
};
export default App;
