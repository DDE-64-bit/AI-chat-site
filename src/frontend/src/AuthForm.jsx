import { useState } from 'react';

function AuthForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('login');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endpoint = mode === 'login' 
      ? "http://localhost:8000/api/token/"
      : "http://localhost:8000/api/register/";
  
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: "test123" }), // voeg passwordveld toe
    });
  
    const data = await response.json();
  
    if (response.ok) {
      if (mode === 'login') {
        // Save JWT token in localStorage
        localStorage.setItem("token", data.access);
        onLogin({ username });
      } else {
        alert("Account aangemaakt, je kunt nu inloggen");
        setMode("login");
      }
    } else {
      alert(data.error || "Er ging iets mis");
    }
  };
  

  return (
    <div className="auth-form">
      <h2>{mode === 'login' ? 'Inloggen' : 'Registreren'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Gebruikersnaam"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">{mode === 'login' ? 'Inloggen' : 'Registreren'}</button>
      </form>
      <p>
        {mode === 'login' ? 'Nog geen account?' : 'Al een account?'}{" "}
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          Wissel naar {mode === 'login' ? 'registratie' : 'inloggen'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
