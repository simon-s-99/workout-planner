import { useState } from "react";
import MuscleCategoryExercisesList from "./MuscleCategoryExercisesList";
import type { MuscleGroup } from "../types";

const MuscleCategoryList: React.FC = () => {
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

  const muscleGroupsListItems: JSX.Element[] = muscleGroups.map((muscleGroup, index) => {
    const [selected, setSelected] = useState(false);

    return (
      <li key={index}>
        <label>
          <input
            type="button"
            name="categoryDropdown"
            value={muscleGroup}
            onClick={() => setSelected(!selected)}></input>
          {/* ^ toggle selected to true if it is false and vice versa */}
        </label>
        <MuscleCategoryExercisesList muscleGroup={muscleGroup} renderList={selected} />
      </li>
    );
  });

  return <ul className="muscleGroupsCategoriesList">{muscleGroupsListItems}</ul>;
};

export default MuscleCategoryList;
