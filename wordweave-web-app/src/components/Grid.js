import React from "react";
import "../styles/GridComp.css";

const GridComp = ({ words, selectedWords, onWordClick, correctGuesses}) => {
  const handleClick = (row, col, word) => {
    onWordClick(word);
  };

  const availableWords = words.filter(word => {
    const guessWords = correctGuesses.reduce((prev, correctGuess) => ([...prev, ...correctGuess]), [])
    return !guessWords.includes(word)
  })

  function getCell(row, col, word, state){
    return (
      <div
        key={`${row}-${col}`}
        className={`grid-cell ${state}`}
        onClick={state !== "guessed" ? () => handleClick(row, col, word) : undefined}
      >
        {word || `${row},${col}`}
      </div>
    )
  }

  const renderGrid = () => {
    const grid = [];
    grid.push(correctGuesses.map((guess, row) => {
      const cols = guess.map((word, col) => {
        return getCell(row, col, word, "guessed")
      })

      return (
        <div key={row} className="grid-row">
          {cols}
        </div>
      )
    }))

    const remainingWords = availableWords.reduce((prev, word) => {
      if (prev.length && prev[prev.length-1].length < 4) {
        prev[prev.length-1].push(word)
        return prev 
      }
      return [...prev, [word]]
    }, [])

    grid.push(remainingWords.map((section, row) => {
      const cols = section.map((word, col) => {
        const isSelected = selectedWords.includes(word);
        return getCell(row+correctGuesses.length, col, word, isSelected ? "selected" : "")
      })

      return (
        <div key={row} className="grid-row">
          {cols}
        </div>
      )
    }))

    return grid;
  };

  return <div className="grid-container">{renderGrid()}</div>;
};

export default GridComp;
