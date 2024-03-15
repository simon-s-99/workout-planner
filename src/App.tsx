import "./stylesheets/App.css";
import "./stylesheets/MuscleCategoryList.css";
import React, { useState } from "react";
import type { Weekday, ExerciseObject, Unit } from "./types";
import { useLocalStorageRead } from "./hooks/useLocalStorageRead";
import Exercise from "./components/Exercise";
import MuscleCategoryList from "./components/MuscleCategoryList";
import WeekdayPicker from "./components/WeekdayPicker";
import PieChart from "./components/PieChart";
import MuscleAnatomyChart from "./components/MuscleAnatomyChart";
import UnitsPicker from "./components/UnitsPicker";
import ClearDay from "./components/ClearDay";
import ResetProgress from "./components/ResetProgress";

const App: React.FC = () => {
  const [weightUnit, setWeightUnit] = useState<Unit>("kilograms");

  const [exerciseData, setExerciseData] = useState<ExerciseObject[]>([]);

  // Currently selected weekday, initialized to "Monday" in case we want a start value.
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");

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

  // bool to help toggle between the add exercise interface and the main content
  const [showAddExerciseMenu, setShowAddExerciseMenu] = useState<boolean>(false);
  let AddExerciseOrGoBackButton: JSX.Element = (
    <label>
      <input
        type="button"
        className="button"
        name={showAddExerciseMenu ? "GoBackFromExerciseMenuButton" : "AddExerciseMenuButton"}
        value={showAddExerciseMenu ? "< Go back" : "Add exercise +"}
        onClick={() => setShowAddExerciseMenu(!showAddExerciseMenu)}></input>
      {/* ^ toggle showAddExerciseMenu to true if it is false and vice versa */}
    </label>
  );

  return (
    <div className="App">
      <header>
        <h1>Workout Planner</h1>
      </header>

      <main>
        <menu>
          <WeekdayPicker selectedWeekday={selectedWeekday} setSelectedWeekday={setSelectedWeekday} />

          <div className="ResetAndClearButtons">
            <ResetProgress getExerciseData={getExerciseData} />
            <ClearDay getExerciseData={getExerciseData} selectedWeekday={selectedWeekday} />
          </div>
        </menu>

        <section>
          <h2>Exercises</h2>
          {showAddExerciseMenu ? (
            <></>
          ) : (
            <>
              <UnitsPicker setWeightUnits={setWeightUnit} getExerciseData={getExerciseData} />
              <Exercise
                weightUnit={weightUnit}
                weekday={selectedWeekday}
                exerciseData={exerciseData}
                getExerciseData={getExerciseData}
              />
            </>
          )}

          {/* The code below shows the "normal" interface with exercise names,
          sets, reps & weight or the add exercise interface where the user
          can pick exercises to add to their program. (Uses ternary operator for brevity.)*/}
          {showAddExerciseMenu ? (
            <div className="AddExerciseMenu">
              {AddExerciseOrGoBackButton}
              <MuscleCategoryList weekday={selectedWeekday} getExerciseData={getExerciseData} />
            </div>
          ) : (
            <div className="AddExerciseMenu">{AddExerciseOrGoBackButton}</div>
          )}
        </section>

        <aside>
          <div>
            <h2>Todays muscle activation</h2>
            <MuscleAnatomyChart weekday={selectedWeekday} weekExerciseListLength={exerciseData.length} />
          </div>

          <div>
            <h2>Weekly set distribution</h2>
            <PieChart exerciseData={exerciseData} getExerciseData={getExerciseData} />
          </div>
        </aside>
      </main>
      <footer>
        <p>Made in 2024 by</p>
        <p>Samuel Lööf, Adam Kumlin & Simon Sörqvist</p>
      </footer>
    </div>
  );
};

export default App;
