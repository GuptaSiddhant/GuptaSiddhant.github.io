import React from "react";
import { useStateRef } from "../state";

const Button = ({ children }) => {
  const [state, dispatch] = useStateRef();

  return (
    <button
      onClick={() =>
        dispatch({
          type: "themeSwitch",
          payload: state.theme === "dark" ? "light" : "dark"
        })
      }
    >
      {state.theme}
    </button>
  );
};

export default Button;
