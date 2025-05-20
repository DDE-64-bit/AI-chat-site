import { useState } from 'react';

function AuthForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('login');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      mode === 'login'
        ? "http://localhost:8000/api/token/"
        : "http://localhost:8000/api/register/";

    const payload =
      mode === 'login'
        ? { username, password }
        : { username, password, email };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      if (mode === 'login') {
        localStorage.setItem("access", data.access);
        onLogin({ username });
      } else {
        // alert("Account created.");
        setMode("login");
      }
    } else {
      alert(data.error || "Something went wrong, please try again.");
    }
  };

  return (
    <div className="auth-form">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {mode === 'register' && (
          <input
            placeholder="Mail address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <input
          placeholder="Wachtwoord"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{mode === 'login' ? 'Log in' : 'Register'}</button>
      </form>
      <p>
        {mode === 'login' ? 'Register?' : 'Log in?'}{" "}
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          Wissel naar {mode === 'login' ? 'registratie' : 'inloggen'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
