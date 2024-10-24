import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/random-words")
      .then((response) => {
        setWords(response.data.words);
      })
      .catch((error) => {
        console.error("There was an error fetching the words!", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Connections Web App</h1>
      </header>
      <main>
        <h2>Random Words</h2>
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </main>
      <footer>{/* Add your footer content here */}</footer>
    </div>
  );
}

export default App;
