import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { todoContext } from "../../contexts/TodoContext";

const EditTodo = (props) => {
    const { taskToEdit, saveTask } = useContext(todoContext);
    const [newEditItem, setNewEditItem] = useState(taskToEdit);

    useEffect(() => {
        setNewEditItem(taskToEdit);
    }, [taskToEdit]);

    function handleEditInput(e) {
        let newTask = {
            ...newEditItem,
            task: e.target.value,
        };
        setNewEditItem(newTask);
    }

    return (
        <div>
            {newEditItem ? (
                <>
                    <input
                        onChange={handleEditInput}
                        value={newEditItem.task}
                        type="text"
                    ></input>
                    <button
                        onClick={() => saveTask(newEditItem, props.history)}
                    >
                        Save
                    </button>
                </>
            ) : (
                <h1>loading</h1>
            )}
        </div>
    );
};

export default EditTodo;
