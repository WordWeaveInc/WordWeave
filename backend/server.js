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

// API endpoint to fetch 4 random connections and their words
app.get("/api/random-words", (req, res) => {
  db.all(
    "SELECT word1, word2, word3, word4 FROM connections ORDER BY RANDOM() LIMIT 4",
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

      res.json({ words });
    }
  );
});

// API endpoint to check if selected words share a connection
app.post("/api/check-connection", express.json(), (req, res) => {
  const { selectedWords } = req.body;

  db.get(
    "SELECT connection FROM connections WHERE word1 IN (?, ?, ?, ?) AND word2 IN (?, ?, ?, ?) AND word3 IN (?, ?, ?, ?) AND word4 IN (?, ?, ?, ?)",
    [...selectedWords, ...selectedWords, ...selectedWords, ...selectedWords],
    (err, row) => {
      if (err) {
        console.error("Error checking connection in database", err);
        res.status(500).json({ error: err.message });
        return;
      }

      if (row) {
        res.json({ isConnected: true, connection: row.connection });
      } else {
        res.json({ isConnected: false });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
