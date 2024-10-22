import React from "react";
import "./App.css";
import TestComp from "./test";
import GridComp from "./Grid";
import DarkModeToggle from "./DarkModeToggle";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WordWeave!</h1>
        <DarkModeToggle />
      </header>
      <main className="App-main">
        <TestComp />
        <GridComp />
      </main>
      <footer>{/* Add your footer content here */}</footer>
    </div>
  );
}

export default App;
