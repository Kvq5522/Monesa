import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "./context";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "")

  function changeTheme(theme) {
    setTheme(theme)
    localStorage.setItem("theme", theme)
  }

  useEffect(() => {
    if (theme == themes.dark)
      document.body.classList.toggle("dark-mode")
    else
      document.body.classList.remove("dark-mode")
  }, [theme])

  return (
    <>
      <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </>
  )
}