---
title: Styling Astro with Radix Colors
date: 2025-05-14
draft: false
---
I'm rewriting my website again—this time with Astro—and gave myself the challenge to do it all with vanilla CSS instead of Tailwind, because I was getting a little too dependent.

One of the things I instantly missed was having access to a collection of high-quality colour palettes right at my fingertips. Luckily, I'm a big fan of [Radix](https://www.radix-ui.com) and remembered they released their ["colors"](https://www.radix-ui.com/colors) package to provide something very similar.

There are a couple of ways to use these colours with Astro so I thought I'd make a note of them.

## Option 1: Importing with CSS

I think the simplest way is to write a CSS file and import the colours you want directly in there. They're all then accessible through the use of CSS variables.

```css
@import "@radix-ui/colors/slate.css";
@import "@radix-ui/colors/cyan.css";

a {
  color: var(--cyan-9);
	&:hover {
    color: var(--cyan-10);
	}
}
/* Any other styling you want... */
```

You can then import this css file anywhere you want to be able to use the colours, like you would any other CSS file in Astro.

For example, in this `Layout` component:

```tsx
---
const { title } = Astro.props;

import "../styles/colours.css";
---

<html lang="en">
	<head>
        <title>Custom Colours</title>
	</head>
	<body>
		<article>
			<h1>Custom Colours</h1>
			<slot />
		</article>
	</body>
	<style>
		h1 {
			color: var(--slate-12);
		}
	</style>
</html>
```

Another bonus here is you can use these same CSS variables in other components, as long as they would be wrapped by this `Layout` component at some point in the tree. This is a pretty good option, for example, if you use a `BaseLayout` component which you wrap every page in.

## Option 2: `define:vars`

The second option is to import the colour palette via the Component Script and inject them into a style tag with `define:vars`.

```tsx
---
const { title } = Astro.props;

import { slate } from "@radix-ui/colors";
---

<html lang="en">
	<head>
		<title>Custom Colours</title>
	</head>
	<body>
		<article>
			<h1>Custom Colours</h1>
			<slot />
		</article>
	</body>
	<style define:vars={slate}>
		h1 {
			color: var(--slate12);
		}
	</style>
</html>
```

> ⚠️ **Note!**
> Using the colours with `define:vars` gives it a slightly different syntax to before. See how it's `--slate12` instead of `--slate-12`.

## Combining the two
There might be a case where you want to globally define *some* colours but scope others to a specific component. This can be done by combining both of the methods above!

I've whipped up a quick example of what I mean here: [Stackblitz](https://stackblitz.com/edit/radix-colors-astro?file=src%2Fpages%2Findex.astro)