// Import required modules
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

// Initialize the Express app and define the port
const app = express();
const port = 5500;

// Middleware to handle CORS and JSON requests
app.use(cors());
app.use(express.json());

// Initialize the Groq API client (replace with your actual API key)
const groq = new Groq({ apiKey: "YOUR_GROQ_API_KEY" });

// Route to test server connection
app.get('/test', (req, res) => {
    res.send("GET request received on /test");
});

// Route to handle chat requests
app.post('/chat', async (req, res) => {
    console.log('Received message:', req.body.message); // Log incoming message
    try {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                { "role": "user", "content": req.body.message }
            ],
            "model": "llama3-8b-8192",
            "temperature": 1,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": false
        });

        console.log('Groq response:', chatCompletion); // Log Groq API response
        res.send(chatCompletion.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error); // Log any errors
        res.status(500).send('Error communicating with Groq API');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
