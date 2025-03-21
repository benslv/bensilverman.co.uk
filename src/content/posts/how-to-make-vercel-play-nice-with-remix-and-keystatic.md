---
title: "How to make Vercel play nice with Remix and Keystatic"
datePublished: 2024-05-23
---

## TL;DR

_If you just want the code:_

```typescript
export async function loader() {
	const reader = createReader(process.cwd(), keystaticConfig);

	// This is the important line!
	console.log(
		fs.readdirSync(path.join(process.cwd(), "app", "content/posts"))
	);

	const posts = await reader.collections.posts.all();

	return json({ posts });
}
```

I recently posted about how I decided to [rewrite my website](/posts/rewriting-my-website), choosing to use Keystatic for managing the trillions and trillions of posts I've made.&#x20;

The process was very simple: I set it up in local development, told it to use GitHub for storage, and added some code in my loaders to read said storage and serve the posts. It's super simple and it works super well...locally. The only tiny issue I ran into was when deploying this same code to production, on a server hosted by Vercel, where absolutely _none_ of the posts were showing up.

Anyway I did some poking around and—through sheer, dumb luck—decided to `console.log` out the folder containing my posts, to check the output in Vercel's runtime logs...and suddenly everything showed up!

I'm not sure if they're doing something strange where they don't make files accessible until something "needs" them but I'm very glad I randomly found it and don't have to switch to another hosting provider or CMS system.
