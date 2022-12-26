import React from "react";
import Map from "../../../atoms/map";
import "./App.css";

function App() {
  return <Map id="canal-map" token={import.meta.env.VITE_TOKEN} showsUserLocation />;
}

export default App;
