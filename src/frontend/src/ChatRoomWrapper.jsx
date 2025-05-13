import { useState } from 'react';
import Chat from './Chat';

function ChatRoomWrapper({ user }) {
  const [activeRoom, setActiveRoom] = useState(null);
  const rooms = ['general', 'tech', 'international', 'design'];

  // const rooms = ['general', 'international', 'interesting', 'off-topic']

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h2>Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room}>
              <button
                className={room === activeRoom ? 'active' : ''}
                onClick={() => setActiveRoom(room)}
              >
                #{room}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="chat-area">
        {activeRoom ? (
          <Chat user={user} roomName={activeRoom} />
        ) : (
          <div className="empty-room">Select a room to begin</div>
        )}
      </main>
    </div>
  );
}

export default ChatRoomWrapper;
