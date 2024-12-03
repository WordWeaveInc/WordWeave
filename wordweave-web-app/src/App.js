import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/App.css";
import GridComp from "./components/Grid";
import DarkModeToggle from "./components/DarkModeToggle";
import { deletePuzzle, getPuzzle, getPuzzleIDs, setPuzzle } from "./modules/puzzleSaving";

function App() {
  const [currPuzzle, setCurrPuzzle] = useState(undefined);
  const [currPuzzleID, setCurrPuzzleID] = useState(undefined);
  const [currAnswer, setCurrAnswer] = useState(undefined);
  const [selectedWords, setSelectedWords] = useState([]);
  const [savedGames, setSavedGames] = useState(getPuzzleIDs());
  const [guesses, setGuesses] = useState([])
  const [life, setLife] = useState(5)
  const [words, setWords] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/generatePuzzle") // UNIX HOSTING PORT
      //.get("http://localhost:5000/api/generatePuzzle")    // WINDOWS HOSTING PORT
      .then((response) => {
        const puzzleData = response.data.puzzle;
        handlePuzzleGenerate(puzzleData);
        console.log(puzzleData);
      })
      .catch((error) => {
        console.error("error generating puzzle", error);
      });
  }, []);

  function handlePuzzleSave() {
    setPuzzle(currPuzzleID, currPuzzle);
    setSavedGames(getPuzzleIDs());
  }

  function handlePuzzleDelete() {
    deletePuzzle(currPuzzleID);
    setSavedGames(getPuzzleIDs());
  }

  function handleSavedGameClick(gameID) {
    const savedGame = getPuzzle(gameID)
    setCurrPuzzleID(gameID);
    setCurrPuzzle(savedGame);
    setSelectedWords([]);
    setGuesses([])
    setLife(5)
    setWords(shuffle(getPuzzleWords(savedGame)))
  }

  function getPuzzleWords(puzzle) {
    return puzzle.clues.reduce((prev, clue) => {
      return [...prev, ...clue.words.map(word => (word.toUpperCase()))]
    }, [])
  }

  function handlePuzzleGenerate(puzzleData) {
    const puzzleID = Math.random().toString(36).substring(2, 9);
    setCurrPuzzle(puzzleData);
    setCurrPuzzleID(puzzleID);
    setGuesses([])
    setLife(5)
    setWords(shuffle(getPuzzleWords(puzzleData)))
  }

  function shuffle(arr) {
    const array = [...arr]
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  function handleShuffleClick() {
    setWords(shuffle(words)); // Shuffle a copy of the words array
  };


  function isCorrectGuess(selected) {
    const clues = currPuzzle.clues
    return clues.some(clue => {
      const correctWords = clue.words.map(word => word.toLowerCase())
      return selected.every(word => {
        return correctWords.includes(word.toLowerCase())
      })
    })
  }

  function handleSubmit() {
    if (selectedWords.length === 4) {
      if (isCorrectGuess(selectedWords)) {
        setSelectedWords([])
        setGuesses(oldGuesses => ([...oldGuesses, selectedWords])) 
        return 
      }
      setLife(oldLife => (oldLife - 1)) 
    }
  }

  function handleWordClick(word) {
    if (selectedWords.includes(word)){
      setSelectedWords(oldWords => (oldWords.filter(oldWord => (oldWord !== word))))
      return
    }

    if (selectedWords.length === 4) {
      return
    }

    setSelectedWords(oldWords => ([...oldWords, word]))
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WordWeave</h1>
        <DarkModeToggle />
      </header>

      <main>
        {currPuzzle && (
          <>
            <h2>Random Words</h2>
            <div className="grid-wrapper">
              <GridComp
                words={words}
                selectedWords={selectedWords}
                onWordClick={handleWordClick}
                correctGuesses={guesses}
              />
            </div>
            <button className="shuffle-button" onClick={handleShuffleClick}>
              Shuffle Words
            </button>
            <button className="save-button" onClick={handlePuzzleSave}>
              Save Puzzle
            </button>
            <button className="delete-button" onClick={handlePuzzleDelete}>
              Delete Puzzle
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
        <div className="saved-games">
          {savedGames.map((gameID, index) => (
            <button onClick={() => handleSavedGameClick(gameID)} key={index}>
              {index + 1}
            </button>
          ))}
        </div>
      </main>
      <footer>{/* Add your footer content here */}</footer>
    </div>
  );
}

export default App;
