import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import EditTodo from "./components/EditTodo/EditTodo";
import { history } from "./helpers/history";

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/add" component={AddTodo} />
                <Route exact path="/list" component={TodoList} />
                <Route exact path="/edit" component={EditTodo} />
            </Switch>
        </Router>
    );
};

export default Routes;
