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
  const [selectedWords, setSelectedWords] = useState([])
  const [savedGames, setSavedGames] = useState(getPuzzleIDs())

  useEffect(() => {
    axios.get("http://localhost:8080/api/generatePuzzle")
      .then((response) => {
        const puzzleData = response.data.puzzle
        handlePuzzleGenerate(puzzleData)
      })
      .catch((error) => {
        console.error("error generating puzzle", error)
      })
  }, [])

  function handlePuzzleSave() {
    setPuzzle(currPuzzleID, currPuzzle)
    setSavedGames(getPuzzleIDs())
  }

  function handlePuzzleDelete() {
    deletePuzzle(currPuzzleID)
    setSavedGames(getPuzzleIDs())
  }

  function handleSavedGameClick(gameID) {
    setCurrPuzzleID(gameID)
    setCurrPuzzle(getPuzzle(gameID))
    setSelectedWords([])
  }
  

  function handlePuzzleGenerate(puzzleData) {
    const puzzleID = Math.random().toString(36).substring(2, 9)
    setCurrPuzzle(puzzleData)
    setCurrPuzzleID(puzzleID)
  }


  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const handleShuffleClick = () => {
    // setWords(shuffle([...words])); // Shuffle a copy of the words array
  };

  const handleWordClick = (word) => {
    // if (gameOver) return;

    // let newSelectedWords;
    // if (selectedWords.includes(word)) {
    //   newSelectedWords = selectedWords.filter((w) => w !== word);
    // } else {
    //   newSelectedWords = [...selectedWords, word];
    // }

    // setSelectedWords(newSelectedWords);

    // if (newSelectedWords.length === 4) {
    //   checkConnection(newSelectedWords);
    // }
  };

  const checkConnection = (selectedWords) => {
    // axios
    //   .post("http://localhost:5000/api/check-connection", { selectedWords })
    //   .then((response) => {
    //     const { isConnected, connection } = response.data;

    //     if (isConnected) {
    //       // Remove the connected words from the game
    //       const remainingWords = words.filter(
    //         (word) => !selectedWords.includes(word)
    //       );
    //       setWords(remainingWords);
    //       setConnectionName(connection);
    //       setConnectedWords(selectedWords);

    //       // Find the row of the first connected word
    //       const firstWordIndex = words.indexOf(selectedWords[0]);
    //       const row = Math.floor(firstWordIndex / 4);
    //       setConnectedRow(row);
    //     } else {
    //       setMistakes(mistakes + 1);
    //       if (mistakes + 1 >= 4) {
    //         setGameOver(true);
    //       }
    //     }

    //     setSelectedWords([]);
    //   })
    //   .catch((error) => {
    //     console.error("There was an error checking the connection!", error);
    //   });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WordWeave</h1>
        <DarkModeToggle />
      </header>

      <main>
        {
          currPuzzle &&
          (
            <>
              <h2>Random Words</h2>
              <div className="grid-wrapper">
                <GridComp
                  words={currPuzzle.unique_words}
                  selectedWords={selectedWords}
                  onWordClick={handleWordClick}
                />
                {/* {connectedRow !== null && (
                  <div
                    className="connection-banner"
                    style={{ top: `${connectedRow * 100}px` }}
                  >
                    <h3>Connection Found: {connectionName}</h3>
                    <p>Words: {connectedWords.join(", ")}</p>
                  </div>
                )} */}
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
              {/* <div>Mistakes: {mistakes} / 4</div>
              {gameOver && <div>Game Over</div>} */}
            </>
          )
        }
        <div className="saved-games">
          {
            savedGames.map((gameID, index) => (
              <button onClick={() => handleSavedGameClick(gameID)}>{index+1}</button>
            ))
          }
        </div>
      </main>
      <footer>{/* Add your footer content here */}</footer>
    </div>
  );
}

export default App;
