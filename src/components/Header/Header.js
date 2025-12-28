"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";
import Cookie from "js-cookie";
import styles from "./Header.module.css";
import { DARK_TOKENS, LIGHT_TOKENS, THEME_COOKIE_TOKEN } from "@/constants";

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const toggleTheme = async () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    Cookie.set(THEME_COOKIE_TOKEN, nextTheme, { expires: 2500 });
    document.documentElement.setAttribute("data-color-theme", nextTheme);

    const newTokens = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    Object.entries(newTokens).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={toggleTheme}>
          {theme === "dark" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
