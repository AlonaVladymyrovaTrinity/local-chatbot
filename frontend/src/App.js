import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
  
    let result = '';
    const botIndex = messages.length + 1;
  
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: '' }
    ]);
  
    try {
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
  
        const updated = result;
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === botIndex ? { ...msg, text: updated } : msg
          )
        );
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ Error talking to the AI.' },
      ]);
    } finally {
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded shadow p-4 space-y-2 overflow-y-auto max-h-[70vh]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[75%] whitespace-pre-wrap ${
              msg.sender === 'user'
                ? 'bg-blue-100 ml-auto text-right'
                : 'bg-green-100 mr-auto text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="w-full max-w-xl flex mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-l"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;