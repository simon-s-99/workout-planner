import { useState, useEffect } from "react";

interface MuscleCategoryProps {
    muscleGroup: string;
    renderList: boolean;
}

const MuscleCategoryExercisesList: React.FC<MuscleCategoryProps> = ({ muscleGroup, renderList }) => {
    if (renderList) {
        const [exercises, setExercises] = useState([]);
        
        return (
            <ul className="muscleGroupCategoryExercisesList">
                <li>{muscleGroup}</li> {/* <- placeholder, put api results here */}
            </ul>
        );
    }
    else {
        return null; // returns no jsx, i.e. nothing for the browser to render 
    }
}

export default MuscleCategoryExercisesList;