import { useState, useEffect } from "react";
import type { ExerciseObject, Weekday, WeekdayExerciseMap, WorkingSet, MuscleGroup } from "../types";
import { useLocalStorageWrite } from "../hooks/useLocalStorageWrite";

interface MuscleCategoryProps {
  weekday: Weekday;
  muscleGroup: MuscleGroup;
  renderList: boolean;
  getExerciseData: () => void;
}

const MuscleCategoryExercisesList: React.FC<MuscleCategoryProps> = ({
  muscleGroup,
  renderList,
  weekday,
  getExerciseData,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [exercises, setExercises] = useState<ExerciseObject[]>([]);

  useEffect(() => {
    // this is a base request, we can build on this later to add exercise type (cardio/strongman/plyometrics/etc.)
    // it is also possible to allow the user to flip through pages of a selected exercise type
    // there is also the possibility to allow the user to search for specific types of exercises
    // ex.: "press" search would give us all exercises with the word "press" in the name
    const url: URL = new URL("https://api.api-ninjas.com/v1/exercises");
    url.searchParams.append("muscle", muscleGroup);

    // Note that the below api call runs twice in development mode
    // this is intended React behaviour to help us catch bugs.
    fetch(url, {
      headers: {
        "X-Api-Key": "WBwUck3C9U2k4S4Jn9yKFw==L0a2Ew4qeuJPacz3",
      },
    })
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error.message);
      });
  }, [muscleGroup]);

  function addExerciseToWeekday(weekday: Weekday, exerciseIndex: number): void {
    // create new ExerciseObject with default set & completed values to put in WeekdayExerciseMap
    const newExercise: ExerciseObject = exercises[exerciseIndex];
    const initialSet: WorkingSet = {
      repetitions: 10,
      weight: 50,
      completed: false,
    };
    newExercise.sets = [initialSet];

    // new WeekdayExerciseMap to give to useLocalStorageWrite
    const weekdayExerciseMap: WeekdayExerciseMap = new Map<Weekday, ExerciseObject[]>([[weekday, [newExercise]]]);

    // write to local storage effectively adding the exercise to the users program
    useLocalStorageWrite(weekdayExerciseMap);

    // Read the stored exercises, which in turn triggers the useEffect in PieChart
    getExerciseData();
  }

  if (renderList) {
    // if the api call is ever slow enough to display a "loading" phase
    // then "..." is displayed to the user so that they have some indication that the page is loading
    return (
      <ul className="muscleGroupCategoryExercisesList">
        {loading ? (
          <li style={style.loading}><i>Loading...</i></li>
        ) : (
          exercises.map((exercise, index) => (
            <li key={index}>
              <label>
                <input type="button" 
                  name="button"
                  value={exercise.name} 
                  onClick={() => addExerciseToWeekday(weekday, index)}></input>
              </label>
            </li>
          ))
        )}
      </ul>
    );
  } else {
    return null; // returns no jsx, i.e. nothing for the browser to render
  }
};

export default MuscleCategoryExercisesList;

const style = {
  loading: {
    listStyle: "none",
  }
}