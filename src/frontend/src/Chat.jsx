import { useEffect, useState, useRef } from 'react';

function Chat({ user, roomName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    console.log("Opening WebSocket for room:", roomName);
    console.log("Using token:", token);

    socketRef.current = new WebSocket(
      `ws://localhost:8000/ws/chat/${roomName}/?token=${token}`
    );

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket closed");
    };

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("Received:", data);
      setMessages((prev) => [...prev, data]);
    };

    setMessages([]);

    return () => socketRef.current.close();
  }, [roomName]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const message = { text: input };
    socketRef.current.send(JSON.stringify(message));
    setInput('');
  };

  return (
    <div className="chat">
      <h2>Welkom, {user.username} — kamer: {roomName}</h2>

      <div className="messages" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user || 'onbekend'}:</strong> {msg.text || '(leeg)'}
          </p>
        ))}
        <div ref={bottomRef} />
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
