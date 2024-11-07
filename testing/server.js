const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: "YOUR_GROQ_API_KEY" });

app.get('/test', (req, res) => {
    res.send("GET request received on /test");
});

app.post('/chat', async (req, res) => {
    console.log('Received message:', req.body.message);
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

        console.log('Groq response:', chatCompletion);
        res.send(chatCompletion.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error communicating with Groq API');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
