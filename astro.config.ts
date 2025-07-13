// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import { remarkSlugify } from "./utils/remarkSlugify";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), solidJs()],
	site: "https://bensilverman.co.uk",
	markdown: {
		remarkPlugins: [remarkSlugify],
	},
});
