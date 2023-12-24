import React, { createContext, useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/Errorpage";
import Logout from "./components/Logout";
import { initialState, reducer } from "./reducer/UseReducer";

// 1.context API
export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/About">
        <About />
      </Route>

      <Route path="/Contact">
        <Contact />
      </Route>

      <Route path="/Login">
        <Login />
      </Route>

      <Route path="/Signup">
        <Signup />
      </Route>

      <Route path="/Logout">
        <Logout />
      </Route>

      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
