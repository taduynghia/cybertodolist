import "./App.css";
import "./index.css";
import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Header from "./components/Home/Header/Header";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import TodoListRCC from "./pages/Todolist/TodoListRCC";
import TodoListRFC from "./pages/Todolist/TodoListRFC";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <LoadingComponent />
      <Switch>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/detail/:id" component={Detail}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/todolistrcc" component={TodoListRCC}></Route>
        <Route exact path="/todolistrfc" component={TodoListRFC}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/todolistredux" component={ToDoListRedux}></Route>
        <Route
          exact
          path="/todolistsaga"
          component={BaiTapToDoListSaga}
        ></Route>
        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
