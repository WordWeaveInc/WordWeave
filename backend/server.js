const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

// Connect to the SQLite database
const db = new sqlite3.Database("wordWeave.db", (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to the SQLite database");
  }
});

// API endpoint to fetch 4 random words
app.get("/api/random-words", (req, res) => {
  db.all(
    "SELECT word1, word2, word3, word4 FROM connections",
    [],
    (err, rows) => {
      if (err) {
        console.error("Error fetching data from database", err);
        res.status(500).json({ error: err.message });
        return;
      }

      if (rows.length === 0) {
        res.status(404).json({ error: "No words found in the database" });
        return;
      }

      // Flatten the list of tuples into a single list of words
      const words = rows.flatMap((row) => Object.values(row));

      // Select 4 random words
      const randomWords = words.sort(() => 0.5 - Math.random()).slice(0, 4);

      res.json({ words: randomWords });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
