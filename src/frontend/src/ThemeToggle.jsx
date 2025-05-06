import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  return (
    <label className="switch">
      <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
      <span className="slider round"></span>
    </label>
  );
}

export default ThemeToggle;
