import { useEffect, useState } from "react";

function ThemeToggle() {
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}

export default ThemeToggle;
