const MuscleCategory: React.FC = () => {
    const muscleGroups: string[] = [
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

    return (
        <ul className="muscleGroupsCategoriesList">
            {muscleGroupsListItems}
        </ul>
    );
};

export default MuscleCategory;