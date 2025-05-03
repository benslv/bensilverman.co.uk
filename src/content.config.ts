import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		date: z.date(),
		draft: z.boolean(),
	}),
});

const noteCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
	schema: z.object({
		title: z.string(),
		date: z.date(),
		draft: z.boolean(),
	}),
});

const projectCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		url: z.string().url().optional(),
		repoUrl: z.string(),
		featured: z.boolean().optional(),
		emoji: z.string().emoji(),
	}),
});

const gameCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/games" }),
	schema: z.object({
		title: z.string(),
		dateCompleted: z.date(),
		rating: z.number().min(1).max(5),
	}),
});

const bookCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
	schema: z.object({
		title: z.string(),
		id: z.string(),
		author: z.string(),
		rating: z.number().min(1).max(5),
		date: z.date(),
	}),
});

export const collections = {
	posts: postCollection,
	notes: noteCollection,
	projects: projectCollection,
	games: gameCollection,
	books: bookCollection,
};
