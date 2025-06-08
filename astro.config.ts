// @ts-check
import { remarkWikiLink } from "@portaljs/remark-wiki-link";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx()],
	site: "https://bensilverman.co.uk",
	markdown: {
		remarkPlugins: [
			[
				remarkWikiLink,
				{
					hrefTemplate: (permalink: string) => {
						return permalink
							.split(" ")
							.map((v) => v.toLowerCase())
							.join("-");
					},
				},
			],
		],
	},
});
