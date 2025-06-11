// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import { remarkSlugify } from "./utils/remarkSlugify";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx()],
	site: "https://bensilverman.co.uk",
	markdown: {
		remarkPlugins: [remarkSlugify],
	},
});
