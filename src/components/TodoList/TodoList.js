import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react/cjs/react.development";
import { todoContext } from "../../contexts/TodoContext";

const TodoList = () => {
    const { todos, getTodosData, changeStatus, deleteTask, editTodo } =
        useContext(todoContext);
    useEffect(() => {
        getTodosData();
    }, []);

    return (
        <ul>
            {todos.map((item) => (
                <li key={item.id} className={item.status ? "completed" : ""}>
                    <input
                        type="checkbox"
                        checked={item.status}
                        onChange={() => changeStatus(item.id)}
                    />
                    {item.task}
                    <button
                        onClick={() => {
                            deleteTask(item.id);
                        }}
                    >
                        &times;
                    </button>
                    <Link to="/edit">
                        <button
                            onClick={() => {
                                editTodo(item.id);
                            }}
                        >
                            Edit
                        </button>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
