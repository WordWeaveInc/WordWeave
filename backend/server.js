const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const {generatePuzzle} = require("./puzzleGenerator")

const app = express();
// const port = 5000; // WINDOWS HOSTING PORT
const port = 8080; // UNIX HOSTING PORT

app.use(cors());

app.get("/api/generatePuzzle", async (req, res) => {
  console.log("generatingPuzzle")
  try {
     const puzzle = await generatePuzzle()
     console.log(puzzle)
     res.status(200).json({puzzle});
     
  } catch (error) {
    console.log(error)
    res.status(500).json({error});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
