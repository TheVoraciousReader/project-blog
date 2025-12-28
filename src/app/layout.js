import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import { LIGHT_TOKENS, DARK_TOKENS, THEME_COOKIE_TOKEN } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";
import { cookies } from "next/headers";
import MotionPreference from "@/components/MotionPreference";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

async function RootLayout({ children }) {
  const persistedTheme = (await cookies()).get(THEME_COOKIE_TOKEN).value || "";
  const theme = persistedTheme || "light";

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <MotionPreference>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </MotionPreference>
      </body>
    </html>
  );
}

export default RootLayout;
