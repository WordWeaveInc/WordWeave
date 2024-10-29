const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
// const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const Groq = require("groq-sdk");

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const app = express();
const port = 6000;

app.use(cors());

app.get("/api/generatePuzzle", async (req, res) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "system",
          "content": "You are an expert puzzle writer for the New York Times. As part of your job, you create clues for a game called Connections. In the game Connections, there are 16 words on a 4x4 grid. The goal is to group the words into 4 categories, each containing 4 related words.\n\nGuidelines:\nUnique Words: Ensure all 16 words are unique, with no word appearing in more than one category.\nApproachability: Use familiar, everyday concepts that most solvers will recognize. Incorporate fun pop-culture references where appropriate (e.g., characters from popular movies or books, well-known items, or phrases).\nSurprising Connections: The puzzle should deliver an “AHA” moment when the solver realizes the true connections between the words.\nBalanced Difficulty: Include a mix of categories—some should be relatively easy to solve, while others should be trickier. Avoid overly nebulous or abstract categories.\nPlayfulness and Fun: Make the puzzle lighthearted and enjoyable, sometimes incorporating elements of pop culture and familiar themes.\nAvoid Overly Similar Words: Categories should feel distinct, and the words in them shouldn’t be overly similar to each other.\n\nReasoning Step-by-Step:\nCraft creative clues for 4 distinct categories.\nSelect 16 unique words, 4 per category, some of which should possibly fit into multiple categories.\nAssign 4 words to each category, ensuring each word belongs to only one category.\nDouble check that each category has exactly 4 words and that no word appears in more than one category.\n\nJSON Format:\nYour output must strictly follow this format, and you must generate a new and original puzzle using the guidelines:\n{\n    \"reasoning\": \"YOUR EXPLANATION FOR WHY YOUR CLUES ARE GOOD\",\n    \"unique_words\": [\"WORD1\", \"WORD2\", \"WORD3\", \"WORD4\", \"WORD5\", \"WORD6\", \"WORD7\", \"WORD8\", \"WORD9\", \"WORD10\", \"WORD11\", \"WORD12\", \"WORD13\", \"WORD14\", \"WORD15\", \"WORD16\"],\n    \"clues\": [\n        {\n            \"clue_text\": \"THE TEXT FOR A CLUE\",\n            \"words\": [\"WORD1\", \"WORD2\", \"WORD3\", \"WORD4\"]\n        },\n        {\n            \"clue_text\": \"THE TEXT FOR A SECOND CLUE\",\n            \"words\": [\"WORD5\", \"WORD6\", \"WORD7\", \"WORD8\"]\n        },\n        {\n            \"clue_text\": \"THE TEXT FOR A THIRD CLUE\",\n            \"words\": [\"WORD9\", \"WORD10\", \"WORD11\", \"WORD12\"]\n        },\n        {\n            \"clue_text\": \"THE TEXT FOR A FOURTH CLUE\",\n            \"words\": [\"WORD13\", \"WORD14\", \"WORD15\", \"WORD16\"]\n        }\n    ]\n}\n\nExample:\nThis is an example puzzle format. You must generate a new, original puzzle with different words and clues:\n{\n    \"reasoning\": \"This puzzle uses words that can appear to belong in multiple categories. For example, 'BASS' could be a type of fish or a musical term. The categories are crafted to be tricky, but they reveal clear connections once solved.\",\n    \"unique_words\": [\"BASS\", \"TROUT\", \"SALMON\", \"COD\", \"DRUM\", \"TRUMPET\", \"PIANO\", \"GUITAR\", \"RED\", \"BLUE\", \"YELLOW\", \"GREEN\", \"TABLE\", \"CHAIR\", \"SOFA\", \"DESK\"],\n    \"clues\": [\n        {\n            \"clue_text\": \"Types of Fish\",\n            \"words\": [\"BASS\", \"TROUT\", \"SALMON\", \"COD\"]\n        },\n        {\n            \"clue_text\": \"Musical Instruments\",\n            \"words\": [\"DRUM\", \"TRUMPET\", \"PIANO\", \"GUITAR\"]\n        },\n        {\n            \"clue_text\": \"Colors\",\n            \"words\": [\"RED\", \"BLUE\", \"YELLOW\", \"GREEN\"]\n        },\n        {\n            \"clue_text\": \"Furniture\",\n            \"words\": [\"TABLE\", \"CHAIR\", \"SOFA\", \"DESK\"]\n        }\n    ]\n}\n\nImportant Notes:\nGenerate New Words: Avoid repeating the example words. Make sure to come up with unique words and categories that fit the guidelines.\nUse Pop-Culture References: Consider adding pop-culture or everyday references to make the puzzle more fun and engaging. This is not necessary for every puzzle and some categories should be more everyday or clever.\nEnsure the Words are Distinct: Each category should be clear and distinct from the others."
        },
        {
          "role": "user",
          "content": "Please create the clues for puzzle number 1 on Monday, October 28, following the format and structure provided. Be sure to include 16 unique words."
        }
      ],
      "model": "gemma2-9b-it",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": false,
      "response_format": {
        "type": "json_object"
      },
      "stop": null
    });
  
     const puzzle = JSON.parse(chatCompletion.choices[0].message.content);
     res.status(200).json({puzzle});
     
  } catch (error) {
    res.status(500).json({error});
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
