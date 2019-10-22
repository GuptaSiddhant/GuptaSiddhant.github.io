import React, { createContext, useContext, useReducer } from "react";
import { setRootCSS } from "./theme";

const initState = {
  theme: "light"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "themeSwitch":
      setRootCSS(action.payload);
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

const localState = JSON.parse(localStorage.getItem("state"));

export const StateContext = createContext();
export const useStateRef = () => useContext(StateContext);
export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, localState || initState)}>
    {children}
  </StateContext.Provider>
);
