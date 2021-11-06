import { Map } from "modules/map";
import React from "react";
import { Legend, Sidebar } from "./components";
import { getSelectedCategory } from "./root-slice/root-selectors";
import { useSelector } from "react-redux";
import { Modal } from "./modules/modal";

function App() {
  const category = useSelector(getSelectedCategory);
  return (
    <div className="app-root">
      <Modal />
      <Map />
      <Sidebar />
      {category && <Legend />}
    </div>
  );
}

export default App;
