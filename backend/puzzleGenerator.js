const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generatePuzzle() {
    try {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": "You are an expert puzzle writer for the New York Times. As part of your job, you create clues for a game called Connections. In the game Connections, there are 16 words on a 4x4 grid. The goal is to group the words into 4 categories, each containing 4 related words. \n\nGuidelines:\nUnique Words: Ensure all 16 words are unique, with no word appearing in more than one category.\nApproachability: Use familiar, everyday concepts that most solvers will recognize. Incorporate fun pop-culture references where appropriate (e.g., characters from popular movies or books, well-known items, or phrases).\nSurprising Connections: The puzzle should deliver an “AHA” moment when the solver realizes the true connections between the words.\nBalanced Difficulty: Include a mix of categories—some should be relatively easy to solve, while others should be trickier. Avoid overly nebulous or abstract categories.\nPlayfulness and Fun: Make the puzzle lighthearted and enjoyable, sometimes incorporating elements of pop culture and familiar themes.\nAvoid Overly Similar Words: Categories should feel distinct, and the words in them shouldn’t be overly similar to each other.\nClear Categories: The categories should be one unified clue. Using conjunctions to create the category will ruin the category because the words contained will not all relate to the same basic clue.\n\nReasoning Step-by-Step:\nCraft creative clues for 4 distinct categories.\nSelect 16 unique words, 4 per category, some of which should possibly fit into multiple categories.\nAssign 4 words to each category, ensuring each word belongs to only one category.\nDouble check that each category has exactly 4 words and that no word appears in more than one category.\nAlso double check that all spelling is correct. Poor spelling will ruin a puzzle.\n\nJSON Format:\nYour output must strictly follow this format, and you must generate a new and original puzzle using the guidelines:\n{\n    \"reasoning\": \"YOUR EXPLANATION FOR WHY YOUR CLUES ARE GOOD. THIS SHOULD INCLUDE AN EXPLANATION FOR EACH CATEGORY, WHY EACH WORD WORKS IN THAT CATEGORY, AND WHY THE SET OF CATEGORIES ARE GOOD TOGETHER. CONSIDER AN EXTRA RED HERRING CATEGORY THAT WILL NOT BE USED, BUT THAT COULD CONTAIN WORDS FROM SOME OF THE OTHER CATEGORIES\",\n    \"clues\": [\n        {\n            \"clue_text\": \"CLEAR STRAIGHTFORWARD CLUE TEXT\",\n            \"words\": [\"WORD1\", \"WORD2\", \"WORD3\", \"WORD4\"]\n        },\n        {\n            \"clue_text\": \"CLEAR STRAIGHTFORWARD SECOND CLUE TEXT\",\n            \"words\": [\"WORD5\", \"WORD6\", \"WORD7\", \"WORD8\"]\n        },\n        {\n            \"clue_text\": \"CLEAR STRAIGHTFORWARD THIRD CLUE TEXT\",\n            \"words\": [\"WORD9\", \"WORD10\", \"WORD11\", \"WORD12\"]\n        },\n        {\n            \"clue_text\": \"CLEAR STRAIGHTFORWARD FOURTH CLUE TEXT\",\n            \"words\": [\"WORD13\", \"WORD14\", \"WORD15\", \"WORD16\"]\n        }\n    ]\n}"
                },
                {
                    "role": "user",
                    "content": ""
                }
            ],
            "model": "llama3-8b-8192",
            "temperature": 1,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": false,
            "response_format": {
                "type": "json_object"
            },
            "stop": null
        });

        // Log the response to debug
        console.log("Chat Completion Response:", chatCompletion);

        // Check if 'choices' is available before accessing
        if (chatCompletion && chatCompletion.choices && chatCompletion.choices.length > 0) {
            return JSON.parse(chatCompletion.choices[0].message.content);
        } else {
            throw new Error("No choices returned in the response.");
        }

    } catch (error) {
        console.error("Error generating puzzle:", error);
        throw error;
    }
}

module.exports = {
    generatePuzzle
};
