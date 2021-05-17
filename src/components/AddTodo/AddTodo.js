import React, { useState, useContext } from "react";
import { todoContext } from "../../contexts/TodoContext";

const AddTodo = () => {
    const [inpValue, setInpValue] = useState("");
    const { addTask } = useContext(todoContext);

    function handleClick() {
        let newObj = {
            task: inpValue,
            status: false,
        };
        addTask(newObj);
        setInpValue("");
    }

    return (
        <div>
            <input
                onChange={(e) => setInpValue(e.target.value)}
                type="text"
                value={inpValue}
            ></input>
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddTodo;
