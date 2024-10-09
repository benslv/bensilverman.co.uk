import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		publishDate: z.date().nullable(),
	}),
});

export const collections = {
	posts: postCollection,
};
