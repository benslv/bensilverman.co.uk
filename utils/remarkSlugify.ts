import { visit } from "unist-util-visit";

/**
 * Convert MDLinks from Obsidian into valid slugs that Astro knows how to handle.
 *
 * @example converts hello%20ben%here.md to hello-ben-here
 */
export function remarkSlugify() {
	return function (tree: any) {
		visit(tree, "link", (node) => {
			if (node.url.endsWith(".md")) {
				node.url = node.url
					.split("%20")
					.map((v: string) => v.toLowerCase())
					.join("-")
					.slice(0, -3);
			}
		});
	};
}
