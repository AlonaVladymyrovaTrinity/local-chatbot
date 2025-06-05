# 🤖 Local Chatbot App (React + Node.js + Ollama)

A private, local chatbot web app that runs entirely on your machine using open-source language models. Built with:

- **React + Tailwind CSS** (Frontend)
- **Node.js + Express** (Backend)
- **Ollama + Mistral** (AI Model - runs locally)

No cloud, no API keys, no data sharing — 100% private AI.

---

## 🚀 Features

- 🔁 Real-time chat interface with a local AI model
- 🎨 Clean, responsive UI built with Tailwind CSS
- 🧠 Model powered by Mistral via [Ollama](https://ollama.com)
- 🌐 Full-stack integration: React frontend + Node backend
- 💬 Contextual responses (can be extended with memory)
- 🖥️ Fully local & offline-ready

---

## 🛠️ Tech Stack

| Layer      | Tech Used                |
|------------|--------------------------|
| Frontend   | React, Tailwind CSS      |
| Backend    | Node.js, Express         |
| AI Model   | Mistral via Ollama       |
| API Comm   | Native `fetch()`         |

---

## ⚙ Setup Instructions

### 1. Clone the Repository

`git clone https://github.com/your-username/local-chatbot.git`
`cd local-chatbot`

### 2. Install and Run Ollama (AI Model)
Download Ollama:
👉 https://ollama.com

Then, in your terminal:
# Download and run Mistral model
`ollama run mistral`

# OR start Ollama API server (recommended)
`ollama serve`

📌 Mistral will be downloaded automatically the first time.

### 3. Backend Setup
`cd backend`
`npm install`
`node index.js`

Backend will run at:
👉 http://localhost:3001

### 4. Frontend Setup

`cd ../frontend`
`npm install`
`npm start`

Frontend will run at:
👉 http://localhost:3000

### 📦 Project Structure

```local-chatbot/
├── backend/            # Node.js + Express API
│   └── index.js
├── frontend/           # React app with Tailwind CSS
│   ├── src/
│   └── tailwind.config.js
├── README.md
```

### 🧪 Example Usage

Send a message in the chat UI like:

> "Tell me a joke"

You'll get a response from the AI model

### 💡 Ideas for Future Improvements
- 🧠 Memory system for ongoing conversation context
- 🧍 Custom persona support (friendly, sarcastic, mentor)
- 🌓 Dark mode toggle
- 💾 Save/load chat history locally
- 🔀 Model selector (Mistral, LLaMA3, etc.)

### 🧰 Requirements
- Node.js v18.20.8 or higher (for native fetch)
- Ollama installed and running (ollama serve)
- Model installed: mistral (or your choice)

### 🙌 Acknowledgments
[Ollama](https://ollama.com/) – for local model running
[Mistral](https://mistral.ai/) – the conversational model
[Tailwind CSS](https://tailwindcss.com/) – fast styling
[React](https://react.dev/) – frontend framework

### 📄 License
This project is for ***personal/local use only***. Check individual model licenses (like Mistral or LLaMA) for usage terms.