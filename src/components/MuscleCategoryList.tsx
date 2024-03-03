import type { MuscleGroup } from "../types";

const MuscleCategory: React.FC = () => {
  const muscleGroups: MuscleGroup[] = [
    "abdominals",
    "biceps",
    "triceps",
    "forearms",
    "chest",
    "lats",
    "traps",
    "lower_back",
    "middle_back",
    "glutes",
    "hamstrings",
    "quadriceps",
    "abductors",
    "adductors",
    "calves",
  ];

  const muscleGroupsListItems: JSX.Element[] = muscleGroups.map((muscleGroup, index) => {
    return (
      <li key={index}>
        <label>
          <input
            type="button"
            name="categoryDropdown"
            value={muscleGroup}
            onChange={(e) => renderExerciseList(e)}></input>
        </label>
      </li>
    );
  });

  function renderExerciseList(e: React.ChangeEvent<HTMLInputElement>) {
    /*
            do api call here
            maybe call new component to draw up the list of exercises
            returned from the api call ??
        */
  }

  return <ul className="muscleGroupsCategoriesList">{muscleGroupsListItems}</ul>;
};

export default MuscleCategory;
