import React from "react";
import "../styles/GridComp.css";

const GridComp = ({ words, selectedWords, onWordClick }) => {
  const handleClick = (row, col, word) => {
    onWordClick(word);
  };

  const renderGrid = () => {
    const grid = [];
    let wordIndex = 0;

    for (let row = 0; row < 4; row++) {
      const cols = [];
      for (let col = 0; col < 4; col++) {
        const word = words[wordIndex];
        const isSelected = selectedWords.includes(word);
        cols.push(
          <div
            key={`${row}-${col}`}
            className={`grid-cell ${isSelected ? "selected" : ""}`}
            onClick={() => handleClick(row, col, word)}
          >
            {word || `${row},${col}`}
          </div>
        );
        wordIndex++;
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
