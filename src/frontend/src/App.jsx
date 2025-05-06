import { useState } from 'react';
import AuthForm from './AuthForm';
import Chat from './Chat';
import ThemeToggle from "./ThemeToggle";

function App() {
  const [user, setUser] = useState(null);
  
  return (  
    <div className="app">
      <ThemeToggle />
      {user ? (
        <Chat user={user} />
      ) : (
        <AuthForm onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
