import { useState } from "react";
import { Weekday } from "../types";
import MuscleCategoryList from "./MuscleCategoryList";

interface AddExerciseProps {
    weekday: Weekday
}

const AddExercise: React.FC<AddExerciseProps> = ({ weekday }) => {
    const [showAddExerciseMenu, setShowAddExerciseMenu] = useState<boolean>(false);

    if (showAddExerciseMenu) {
        return (
            <div className="AddExercise">
                <label>
                    <input
                        type="button"
                        name="GoBackFromExerciseMenuButton"
                        value="<"
                        onClick={() => setShowAddExerciseMenu(!showAddExerciseMenu)}></input>
                    {/* ^ toggle showAddExerciseMenu to true if it is false and vice versa */}
                </label>
                <MuscleCategoryList />
            </div>
        )
    }
    else {
        return (
            <div className="AddExercise">
                <label>
                    <input
                        type="button"
                        name="AddExerciseMenuButton"
                        value="+"
                        onClick={() => setShowAddExerciseMenu(!showAddExerciseMenu)}></input>
                    {/* ^ toggle showAddExerciseMenu to true if it is false and vice versa */}
                </label>
            </div>
        );
    }
}

export default AddExercise;