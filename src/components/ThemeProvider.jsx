import React from "react";
import { ThemeProvider as ThemeToggleProvider } from "next-themes"; // optional: replace this if not using it

const ThemeProvider = ({ children }) => {
  return (
    <ThemeToggleProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeToggleProvider>
  );
};

export default ThemeProvider;
