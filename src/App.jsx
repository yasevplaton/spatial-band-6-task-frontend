import { Map } from "modules/map";
import React from "react";
import { Sidebar } from "./components";

function App() {
  return (
    <div className="app-root">
      <Map />
      <Sidebar />
    </div>
  );
}

export default App;
