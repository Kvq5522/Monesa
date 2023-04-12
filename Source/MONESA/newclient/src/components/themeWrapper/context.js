import { createContext } from "react";

export const themes = {
  dark: "dark-mode",
  light: "",
};

export const ThemeContext = createContext({
  theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : "",
  changeTheme: () => {},
});
