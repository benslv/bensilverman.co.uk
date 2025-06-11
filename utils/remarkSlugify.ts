import { visit } from "unist-util-visit";

/**
 * Convert MDLinks from Obsidian into valid slugs that Astro knows how to handle.
 *
 * @example converts hello%20ben%20here.md to hello-ben-here
 */
export function remarkSlugify() {
	return function (tree: any) {
		visit(tree, "link", (node) => {
			if (node.url.endsWith(".md")) {
				node.url = decodeURIComponent(node.url)
					.split(" ")
					.map((v: string) => v.toLowerCase())
					.join("-")
					.slice(0, -3);
			}
		});
	};
}
