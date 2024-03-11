import React, { useState, useEffect } from "react";
import "./App.css";
import Exercise from "./components/Exercise";
import type {
  Settings,
  Weekday,
  ExerciseObject,
  WeekdayExerciseMap,
} from "./types";
import MuscleCategoryList from "./components/MuscleCategoryList";
import WeekdayPicker from "./components/WeekdayPicker";
import UnitsPicker from "./components/UnitsPicker";
import { useLocalStorageRead } from "./hooks/useLocalStorageRead";
import { useLocalStorageWrite } from "./hooks/useLocalStorageWrite";
import PieChart from "./components/PieChart";
import TrainingGoalPicker from "./components/TrainingGoalPicker";
import MuscleAnatomyChart from "./components/MuscleAnatomyChart";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  /*
    Change name of this variable
    "data" means nothing in this context 
  */
  const [data, setData] = useState<ExerciseObject[]>([]);

  // Currently selected weekday, initialized to "Monday" in case we want a start value.
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");

   const [exercises, setExercises] = useState<ExerciseObject[]>([]);

 
  // const testData: WeekdayExerciseMap = new Map<Weekday, ExerciseObject[]>([
  //   [
  //     "Monday",
  //     [
  //       {
  //         name: "Bench Press",
  //         type: "Strength",
  //         muscle: "Chest",
  //         equipment: "Barbell",
  //         difficulty: "Intermediate",
  //         instructions:
  //           "Lie on the bench, lift the barbell, keep your feet flat on the ground.",
  //         sets: [
  //           {
  //             repetitions: 10,
  //             weight: 200,
  //             completed: false,
  //           },
  //           {
  //             repetitions: 8,
  //             weight: 220,
  //             completed: false,
  //           },
  //         ],
  //         completed: false,
  //       },
  //       {
  //         name: "Bench Press",
  //         type: "Strength",
  //         muscle: "Chest",
  //         equipment: "Barbell",
  //         difficulty: "Intermediate",
  //         instructions:
  //           "Lie on the bench, lift the barbell, keep your feet flat on the ground.",
  //         sets: [
  //           {
  //             repetitions: 10,
  //             weight: 200,
  //             completed: false,
  //           },
  //           {
  //             repetitions: 8,
  //             weight: 220,
  //             completed: false,
  //           },
  //         ],
  //         completed: false,
  //       },
  //       {
  //         name: "Bench Press",
  //         type: "Strength",
  //         muscle: "Chest",
  //         equipment: "Barbell",
  //         difficulty: "Intermediate",
  //         instructions:
  //           "Lie on the bench, lift the barbell, keep your feet flat on the ground.",
  //         sets: [
  //           {
  //             repetitions: 10,
  //             weight: 200,
  //             completed: false,
  //           },
  //           {
  //             repetitions: 8,
  //             weight: 220,
  //             completed: false,
  //           },
  //         ],
  //         completed: false,
  //       },
  //     ],
  //   ],
  // ]);

  //  useLocalStorageWrite(testData);

  // bool to help toggle between the add exercise interface and the main content
  const [showAddExerciseMenu, setShowAddExerciseMenu] =
    useState<boolean>(false);
  let AddExerciseOrGoBackButton: JSX.Element = (
    <label>
      <input
        type="button"
        name={showAddExerciseMenu ? "GoBackFromExerciseMenuButton" : "AddExerciseMenuButton"}
        value={showAddExerciseMenu ? "<" : "+"}
        onClick={() => setShowAddExerciseMenu(!showAddExerciseMenu)}></input>
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

    setData(exerciseData);
  }

  return (
    <div className="App">
      <h1>Workout Planner</h1>
      <WeekdayPicker
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={setSelectedWeekday}
      />

      <Exercise weekday={selectedWeekday} weekExerciseListLength={data.length} getExerciseData={getExerciseData} />
      <div>
        <h2>Exercises</h2>
        <h3>What is your training goal?</h3>
        <TrainingGoalPicker setSettings={setSettings} />
        <UnitsPicker setSettings={setSettings} />
      </div>

      {/* The code below shows the "normal" interface with exercise names,
          sets, reps & weight or the add exercise interface where the user
          can pick exercises to add to their program. (Uses ternary operator for brevity.)*/}
      <main>
        {showAddExerciseMenu ? (
          <div className="AddExerciseMenu">
            {AddExerciseOrGoBackButton}
            <MuscleCategoryList weekday={selectedWeekday} getExerciseData={getExerciseData} />
          </div>
        ) : (
          <div className="AddExerciseMenu">
            {AddExerciseOrGoBackButton}
          </div>
        )}
      </main>

      <PieChart data={data} getExerciseData={getExerciseData} />

      <MuscleAnatomyChart weekday={selectedWeekday} weekExerciseListLength={data.length} />

    </div>
  );
};
export default App;
