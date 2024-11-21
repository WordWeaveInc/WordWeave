const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const {generatePuzzle} = require("./puzzleGenerator")

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/generatePuzzle", async (req, res) => {
  console.log("generatingPuzzle")
  try {
     const puzzle = await generatePuzzle()
     res.status(200).json({puzzle});
     
  } catch (error) {
    res.status(500).json({error});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
