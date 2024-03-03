import { useState, useEffect } from "react";
import { Exercise } from "../types";

interface MuscleCategoryProps {
    muscleGroup: string;
    renderList: boolean;
}

const MuscleCategoryExercisesList: React.FC<MuscleCategoryProps> = ({ muscleGroup, renderList }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        // this is a base request, we can build on this later to add exercise type (cardio/strongman/plyometrics/etc.)
        // it is also possible to allow the user to flip through pages of a selected exercise type
        // there is also the possibility to allow the user to search for specific types of exercises
        // ex.: "press" search would give us all exercises with the word "press" in the name 
        const url: URL = new URL("https://api.api-ninjas.com/v1/exercises");
        url.searchParams.set("muscle", muscleGroup);

        fetch(url, {
            headers: {
                "X-Api-Key": "hRwPXK6YvKgUbEKzGW01sw==YttRwZHUK8grKBfI"
            }
        })
            .then((response) => response.json())
            .then((data) => setExercises(data))
            .then(() => setLoading(false))
            .catch((error) => {
                console.log(error.message);
            });

    }, [muscleGroup]);

    if (renderList) {
        // if the api call is ever slow enough to display a "loading" phase
        // then "..." is displayed to the user so that they have some indication that the page is loading
        return (
            <ul className="muscleGroupCategoryExercisesList">
                {loading ? (
                    <li>...</li>
                ) : (
                    exercises.map((exercise, index) => (
                        <li key={index}>{exercise.name}</li>
                    ))
                )}
            </ul>
        );
    }
    else {
        return null; // returns no jsx, i.e. nothing for the browser to render 
    }
}

export default MuscleCategoryExercisesList;