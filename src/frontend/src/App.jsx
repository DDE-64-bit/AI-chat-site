import { useState } from 'react';
import AuthForm from './AuthForm';
/*
import Chat from './Chat';
import ThemeToggle from "./ThemeToggle";
*/
import ChatRoomWrapper from './ChatRoomWrapper';

function App() {
  const [user, setUser] = useState(null);
  
  return (  
    <div className="app">
      {/*<ThemeToggle />*/}
      {user ? (
        <ChatRoomWrapper user={user} />
      ) : (
        <AuthForm onLogin={setUser} />
      )}
    </div>
  );
}

export default App;

// ----Tailwind test----

// export default function App() {
//   return (
//     <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
//       Tailwind werkt 🎉
//     </div>
//   )
// }
