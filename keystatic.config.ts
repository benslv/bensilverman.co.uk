import { collection, config, fields } from "@keystatic/core";

export default config({
	storage: {
		kind: "local",
		// repo: "benslv/www",
	},
	collections: {
		posts: collection({
			label: "Posts",
			columns: ["title", "date", "draft"],
			slugField: "title",
			path: "src/content/posts/*",
			entryLayout: "content",
			format: {
				contentField: "body",
			},
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				date: fields.date({ label: "Date" }),
				draft: fields.checkbox({ label: "Draft" }),
				body: fields.markdoc({
					label: "Body",
					extension: "md",
				}),
			},
		}),
		pages: collection({
			label: "Pages",
			slugField: "title",
			path: "src/content/pages/*",
			entryLayout: "content",
			format: {
				contentField: "body",
			},
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				body: fields.markdoc({
					label: "Body",
					extension: "md",
				}),
			},
		}),
	},
});
