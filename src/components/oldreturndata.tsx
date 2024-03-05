<div className="exercise-block">

    {/* <h3 onClick={toggleShowSets}>{exercise.name}</h3> */}

    <div className="input-and-button-container">

      {/* Dynamic interaction UI for editing sets */}

      <span className="total-sets-info">Total Sets: {editableSets.length}</span>

      <div className="flex-container">

        <button

          onClick={handleExerciseCompletedChange}

          className="exercise-completed-button"

        >

          Exercise Completed

        </button>

        <label className="flex-label">

          <input

            type="checkbox"

            checked={editableSets.every((set) => set.completed)}

            onChange={toggleAllSetsCompleted}

            className="checkbox-margin"

          />

          All sets completed

        </label>

        <button onClick={addSet} className="add-button">

          Add Set

        </button>

      </div>

    </div>

  </div>;



  {

    showSets &&

      editableSets.map((set, index) => (

        <div key={index} className="exercise-block exercise-block-background">

          <span>{`Set ${index + 1}: `}</span>

          <label className="label-margin">

            Reps:

            <input

              type="number"

              value={set.repetitions}

              onChange={(e) =>

                handleSetChange(index, "repetitions", parseInt(e.target.value))

              }

              className="input-style"

            />

          </label>

          <label className="label-margin">

            Weight:

            <input

              type="number"

              value={set.weight}

              onChange={(e) =>

                handleSetChange(index, "weight", parseInt(e.target.value))

              }

              className="input-style"

            />

          </label>

          <label className="checkbox-label">

            <input

              type="checkbox"

              checked={set.completed}

              onChange={() => toggleSetCompleted(index)}

              className="checkbox-margin"

            />

            Completed

          </label>

          <button onClick={() => removeSet(index)} className="remove-button">

            Remove Set

          </button>

        </div>

      ));

  }

 };