import { useState } from "react";
import MuscleCategoryExercisesList from "./MuscleCategoryExercisesList";
import type { MuscleGroup, Weekday } from "../types";

/*
  This component displays a list of all the categories a user could choose 
  when adding a new exercise to their training program.
  The names of the categories are clickable buttons which in turn displays
  a list of choices for the user so that they can add individual exercises 
  to their training program.
*/

interface MuscleCategoryListProps {
  weekday: Weekday;
  getExerciseData: () => void;
}

const MuscleCategoryList: React.FC<MuscleCategoryListProps> = ({
  weekday,
  getExerciseData,
}) => {
  const muscleGroups: MuscleGroup[] = [
    "Abdominals",
    "Biceps",
    "Triceps",
    "Forearms",
    "Chest",
    "Lats",
    "Traps",
    "Lower_back",
    "Middle_back",
    "Glutes",
    "Hamstrings",
    "Quadriceps",
    "Abductors",
    "Adductors",
    "Calves",
  ];

  const muscleGroupsListItems: JSX.Element[] = muscleGroups.map(
    (muscleGroup, index) => {
      const [selected, setSelected] = useState(false);

      return (
        <li key={index} style={selected ? style.activeDropdown : style.inactiveDropdown}>
          <label>
            <input
              type="button"
              name="categoryDropdown"
              value={muscleGroup}
              onClick={() => setSelected(!selected)}></input>
            {/* ^ toggle selected to true if it is false and vice versa */}
          </label>
          {/* fetches a list of exercises (from an API) and displays them */}
          <MuscleCategoryExercisesList
            getExerciseData={getExerciseData}
            weekday={weekday}
            muscleGroup={muscleGroup}
            renderList={selected} />
        </li>
      );
    });

  return (
    <ul className="MuscleGroupsCategoriesList">{muscleGroupsListItems}</ul>
  );
};

export default MuscleCategoryList;

// css for the dropdown menus icon, handled dynamically in the jsx
const style = {
  activeDropdown: {
    listStyleImage: 'url("./downFacingArrow.svg")',
  },
  inactiveDropdown: {
    listStyleImage: 'url("./rightFacingArrow.svg")',
  },
};
