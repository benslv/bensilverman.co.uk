import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		datePublished: z.date().nullable(),
	}),
});

const noteCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		datePublished: z.date().nullable(),
	}),
});

const projectCollection = defineCollection({
	type: "data",
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
	type: "content",
	schema: z.object({
		title: z.string(),
		dateCompleted: z.date(),
		rating: z.number().int().min(1).max(5),
	}),
});

const bookCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		id: z.string(),
		author: z.string(),
		rating: z.number(),
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
