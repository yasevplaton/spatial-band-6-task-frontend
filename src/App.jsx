import { Map } from "modules/map";
import React from "react";
import { Legend, Sidebar } from "./components";
import { getSelectedCategory } from "./root-slice/root-selectors";
import { useSelector } from "react-redux";

function App() {
  const category = useSelector(getSelectedCategory);
  return (
    <div className="app-root">
      <Map />
      <Sidebar />
      {category && <Legend />}
    </div>
  );
}

export default App;
