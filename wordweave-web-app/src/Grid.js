import React from "react";
import "./GridComp.css";

const GridComp = () => {
  const handleClick = (row, col) => {
    alert(`Clicked on cell (${row}, ${col})`);
  };

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < 4; row++) {
      const cols = [];
      for (let col = 0; col < 4; col++) {
        cols.push(
          <div
            key={`${row}-${col}`}
            className="grid-cell"
            onClick={() => handleClick(row, col)}
          >
            {row},{col}
          </div>
        );
      }
      grid.push(
        <div key={row} className="grid-row">
          {cols}
        </div>
      );
    }
    return grid;
  };

  return <div className="grid-container">{renderGrid()}</div>;
};

export default GridComp;
