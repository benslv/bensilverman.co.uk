import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		publishDate: z.date().nullable(),
	}),
});

const projectCollection = defineCollection({
	type: "data",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		url: z.string().url().optional(),
		repoUrl: z.string(),
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

export const collections = {
	posts: postCollection,
	projects: projectCollection,
	games: gameCollection,
};
