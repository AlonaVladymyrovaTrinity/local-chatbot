const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;

  const ollama = spawn('ollama', ['run', 'mistral']);

  let output = '';
  let error = '';

  ollama.stdin.write(userMessage);
  ollama.stdin.end();

  ollama.stdout.on('data', (data) => {
    output += data.toString();
  });

  ollama.stderr.on('data', (data) => {
    error += data.toString();
  });

  ollama.on('close', (code) => {
    if (code !== 0 || error) {
      console.error('Ollama error:', error);
      return res.status(500).json({ response: 'Error running model' });
    }
    return res.json({ response: output.trim() });
  });
});

app.listen(PORT, () => {
  console.log(`🧠 Backend running on http://localhost:${PORT}`);
});
