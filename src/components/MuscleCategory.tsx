interface MuscleCategoryProps {
    muscleGroup: string;
    // we also need access to the users training goals here so that we
    // can make a more specific api call with this info 
}

const MuscleCategory: React.FC<MuscleCategoryProps> = ({ muscleGroup }) => {
    return (
        <div>
            <label>
                <input type="button" name="categoryDropdown" value={muscleGroup}></input>
            </label>
        </div>
    );
};

export default MuscleCategory;