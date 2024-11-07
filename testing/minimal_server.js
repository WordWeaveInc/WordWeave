const express = require('express');
const cors = require('cors');

const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send("GET request received on /test");
});

app.post('/test', (req, res) => {
    res.send("POST request received on /test");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
