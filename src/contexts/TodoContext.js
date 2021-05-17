import React, { useReducer } from "react";
import axios from "axios";

export const todoContext = React.createContext();

const INIT_STATE = {
    todos: [],
    taskToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_TODOS_DATA":
            return { ...state, todos: action.payload };
        case "EDIT_TODO":
            return { ...state, taskToEdit: action.payload };
        default:
            return state;
    }
};

const TodoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const getTodosData = async () => {
        let { data } = await axios("http://localhost:8000/todos");
        dispatch({
            type: "GET_TODOS_DATA",
            payload: data,
        });
    };

    const addTask = (newTask) => {
        axios.post("http://localhost:8000/todos", newTask);
        getTodosData();
    };

    const changeStatus = async (id) => {
        let { data } = await axios.patch(`http://localhost:8000/todos/${id}`);

        await axios.patch(`http://localhost:8000/todos/${id}`, {
            status: !data.status,
        });
        getTodosData();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:8000/todos/${id}`);
        getTodosData();
    };

    const editTodo = async (id) => {
        let { data } = await axios(`http://localhost:8000/todos/${id}`);
        dispatch({
            type: "EDIT_TODO",
            payload: data,
        });
    };

    const saveTask = async (newTask, history) => {
        try {
            await axios.patch(
                `http://localhost:8000/todos/${newTask.id}`,
                newTask
            );
            history.push("/");
        } catch (error) {
            history.push("/error");
        }
    };

    return (
        <todoContext.Provider
            value={{
                todos: state.todos,
                taskToEdit: state.taskToEdit,
                addTask,
                getTodosData,
                changeStatus,
                deleteTask,
                editTodo,
                saveTask,
            }}
        >
            {children}
        </todoContext.Provider>
    );
};

export default TodoContextProvider;
