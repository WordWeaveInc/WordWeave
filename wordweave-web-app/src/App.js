import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/App.css";
import GridComp from "./components/Grid";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [connectionName, setConnectionName] = useState("");
  const [connectedWords, setConnectedWords] = useState([]);
  const [connectedRow, setConnectedRow] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/random-words")
      .then((response) => {
        const shuffledWords = shuffle(response.data.words);
        setWords(shuffledWords);
      })
      .catch((error) => {
        console.error("There was an error fetching the words!", error);
      });
  }, []);

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
    setWords(shuffle([...words])); // Shuffle a copy of the words array
  };

  const handleWordClick = (word) => {
    if (gameOver) return;

    let newSelectedWords;
    if (selectedWords.includes(word)) {
      newSelectedWords = selectedWords.filter((w) => w !== word);
    } else {
      newSelectedWords = [...selectedWords, word];
    }

    setSelectedWords(newSelectedWords);

    if (newSelectedWords.length === 4) {
      checkConnection(newSelectedWords);
    }
  };

  const checkConnection = (selectedWords) => {
    axios
      .post("http://localhost:5000/api/check-connection", { selectedWords })
      .then((response) => {
        const { isConnected, connection } = response.data;

        if (isConnected) {
          // Remove the connected words from the game
          const remainingWords = words.filter(
            (word) => !selectedWords.includes(word)
          );
          setWords(remainingWords);
          setConnectionName(connection);
          setConnectedWords(selectedWords);

          // Find the row of the first connected word
          const firstWordIndex = words.indexOf(selectedWords[0]);
          const row = Math.floor(firstWordIndex / 4);
          setConnectedRow(row);
        } else {
          setMistakes(mistakes + 1);
          if (mistakes + 1 >= 4) {
            setGameOver(true);
          }
        }

        setSelectedWords([]);
      })
      .catch((error) => {
        console.error("There was an error checking the connection!", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WordWeave</h1>
        <DarkModeToggle />
      </header>
      <main>
        <h2>Random Words</h2>
        <div className="grid-wrapper">
          <GridComp
            words={words}
            selectedWords={selectedWords}
            onWordClick={handleWordClick}
          />
          {connectedRow !== null && (
            <div
              className="connection-banner"
              style={{ top: `${connectedRow * 100}px` }}
            >
              <h3>Connection Found: {connectionName}</h3>
              <p>Words: {connectedWords.join(", ")}</p>
            </div>
          )}
        </div>
        <button className="shuffle-button" onClick={handleShuffleClick}>
          Shuffle Words
        </button>
        <div>Mistakes: {mistakes} / 4</div>
        {gameOver && <div>Game Over</div>}
      </main>
      <footer>{/* Add your footer content here */}</footer>
    </div>
  );
}

export default App;
