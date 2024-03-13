import { useState } from "react";
import { Weekday } from "../types";
import MuscleCategoryExercisesList from "./MuscleCategoryExercisesList";
import type { MuscleGroup } from "../types";
import test from "../assets/rightFacingArrow.svg"

interface MuscleCategoryListProps {
  weekday: Weekday;
  getExerciseData: () => void;
}

const MuscleCategoryList: React.FC<MuscleCategoryListProps> = ({ weekday, getExerciseData }) => {
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
        <MuscleCategoryExercisesList 
          getExerciseData={getExerciseData} 
          weekday={weekday} 
          muscleGroup={muscleGroup} 
          renderList={selected} />
      </li>
    );
  });

  return (
    <ul className="muscleGroupsCategoriesList">{muscleGroupsListItems}</ul>
  );
};

export default MuscleCategoryList;

// css for the dropdown menus icon, handled dynamically in the jsx 
const style = {
  activeDropdown: {
    listStyleImage: 'url("/src/assets/downFacingArrow.svg")',
  },
  inactiveDropdown: {
    listStyleImage: 'url("/src/assets/rightFacingArrow.svg")',
  }
}