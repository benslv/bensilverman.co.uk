---
title: Using next-themes with Stitches and Next.js
datePublished: 2021-12-18
---

I've been building my website with the help of an amazing CSS-in-JSS solution called [Stitches](https://stitches.dev). If you haven't heard of it before I would definitely recommend taking a peek at their website and giving it a try because I almost instantly converted across from `styled-components`.

This isn't a post all about how great I think Stitches is, as much as the dev team would probably love it, though. Instead, I wanted to quickly write-up how I got dark mode working on this site using Next.js, Stitches and a little package called [`next-themes`](https://www.npmjs.com/package/next-themes).

## Setup the next-themes provider

Install `next-themes` with:

```bash
npm install next-themes
```

and add its provider to our Next.js `App` component.

```tsx
// _app.tsx

import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
export default App;
```

## Create a dark theme in Stitches

Head on over to your Stitches config file (`stitches.config.ts`, for me) and import `createTheme` from `stitches/react`. Then create a new theme for your dark theme like so:

```ts
// stitches.config.ts

import { createStitches, createTheme } from "@stitches/react";

export const { styled, css, theme } = createStitches({
	// other styling here...
});

// Create your new dark theme below, like this.
export const darkTheme = createTheme("dark", {
	colors: {
		text: "black",
		heading: "grey",
		background: "white",
		accent: "cyan",
	},
});
```

Great! Now we want to set this theme up as an option in `next-themes`. Head back over to the `_app` file and set it up like so.

```tsx
// _app.tsx

import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

// Import your dark theme into the component.
import { darkTheme } from "../stitches.config";

function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<ThemeProvider
			attribute="class"
			value={{
				dark: darkTheme.toString(), // this .toString() is important
				light: "light",
			}}
		>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
export default App;
```

## Theme Toggle Component

Lastly we just need to make a little button or something to let you toggle between the two colour themes.

```ts
// ThemeToggle.tsx

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  const toggleTheme = () => {
    const targetTheme = resolvedTheme === "light" ? "dark" : "light";

    setTheme(targetTheme);
  };

  // Don't render the theme-toggling UI before the mounted.
  // See: https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
  if (!isMounted) {
    return <button>Loading...</button>;
  }

  return (
    <button onClick={toggleTheme}>Switch to {resolvedTheme === "light" ? "dark" : "light"}</button>
  );
};
```

Add the button wherever you want it and you should see your theme switch between dark and light mode. It'll also remember which mode you left selected and use it on subsequent page refreshes!
