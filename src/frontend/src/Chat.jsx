import { useEffect, useState, useRef } from 'react';

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8000/ws/chat/");

    socketRef.current.onopen = () => {
    console.log("Verbonden");
    };

    socketRef.current.onclose = () => {
    console.log("Gesloten");
    };

    socketRef.current.onerror = (err) => {
    console.error("Fout:", err);
    };
    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("ontvangen via socket:", data);
      setMessages((prev) => [...prev, data]);
    };

    return () => socketRef.current.close();
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return;
    const message = { text: input };
    socketRef.current.send(JSON.stringify(message));
    setInput('');
  };

  return (
    <div className="chat">
      <h2>Welkom, {user.username}</h2>

      <div className="messages">
      {messages.map((msg, index) => (
        <p key={index}>
            <strong>{msg.user || 'onbekend'}:</strong> {msg.text || '(leeg)'}
        </p>
        ))}

      </div>

      <div className="input">
        <input
          placeholder="Typ een bericht..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Verstuur</button>
      </div>
    </div>
  );
}

export default Chat;
