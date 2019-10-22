import React, { useEffect } from "react";
import "./App.css";
import { setRootCSS } from "./theme";
import { useStateRef } from "./state";
import Button from "./components/button";

function App() {
  const [state, dispatch] = useStateRef();
  setRootCSS(state.theme);
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <div id="App">
      Theme: <Button />
    </div>
  );
}

export default App;
