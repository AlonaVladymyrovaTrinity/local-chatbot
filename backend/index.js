const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
        method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: userMessage,
        stream: true,
      }),
    });

    res.setHeader('Content-Type', 'text/plain');

    for await (const chunk of ollamaRes.body) {
      const decoded = new TextDecoder().decode(chunk);
      const lines = decoded.trim().split('\n');

      for (const line of lines) {
        if (!line) continue;
        const json = JSON.parse(line);
        if (json.done) return;
        if (json.response) res.write(json.response);
      }
    }

    res.end();
  } catch (err) {
    console.error('Error contacting Ollama API:', err);
    return res.status(500).json({ response: 'Error running model via API' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});