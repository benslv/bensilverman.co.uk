---
date: 2025-12-09
title: Advent of Code 2025 - Day 9
draft: false
---
The hardest Part 2, I think!

[Read the full prompt.](https://adventofcode.com/2025/day/9)

## Part 1
The idea is we have a bunch of points on a grid, and need to find which pair of points would create the largest rectangle (imagine them defining opposite corners of a rectangle).

The first thing that tripped me up was realising that these coordinates weren't on a continuous plane, and we needed to take into account the "size" of the point itself when calculating the area of a rectangle. This amounted to adding `1` to each dimension when calculating the area.

Then you just need to loop through each pair of points—you can cut out some duplicate checks by properly defining your start and ends of the `for`-loops—and compare areas until you find the max.

```ts
for (let i = 0; i < points.length - 1; i++) {
	const [x1, y1] = points[i];

	for (let j = i + 1; j < points.length; j++) {
		const [x2, y2] = points[j];

		const rMinX = Math.min(x1, x2);
		const rMaxX = Math.max(x1, x2);
		const rMinY = Math.min(y1, y2);
		const rMaxY = Math.max(y1, y2);

		const area = (rMaxY - rMinY + 1) * (rMaxX - rMinX + 1);

		partOne = Math.max(partOne, area);
	}
}
```
## Part 2
This got trickier in Part 2, however. These same coordinates now need to be treated as the *vertices* of a bounding shape, and the only valid rectangles are ones which lie completely within this shape. I needed to turn to the [Advent of Code subreddit](https://www.reddit.com/r/adventofcode) for a bit of help on this one, I'll admit. I *think* I understand it now?

It's worth noting that the input file is defined in such a way that the next point in the list is connected to the one before it, all the way back to the beginning. This is how the boundary shape is defined, and it's also something I missed at first because I skimmed through Part 2 and didn't properly read it. Once we know this, we can construct a [pairwise](https://docs.python.org/3/library/itertools.html#itertools.pairwise) list of points to get the actual *edges* of the bounding shape.

```ts
// Coordinates are defined "in order" around the polygon, so we can do this.
for (let i = 0; i < points.length; i++) {
	greenLines.push([points[i], points[(i + 1) % points.length]]);
}
```

For each rectangle we construct, then, we just need to check that it doesn't intersect with any of these lines, and we know that it lies within the shape and can be considered valid. This is where my understanding falls apart a bit, though, because apparently this wouldn't work as a general case. We're lucky that Eric Wastl (the creator) generated an input that was okay! I think the idea is that this collision-detection wouldn't work if there were any points that were directly adjacent to each other in the grid. One to look back at later, maybe.

```ts
if (area > partTwo) {
	let isColliding = false;

	for (const [[p, q], [r, s]] of greenLines) {
		const eMinX = Math.min(p, r);
		const eMaxX = Math.max(p, r);
		const eMinY = Math.min(q, s);
		const eMaxY = Math.max(q, s);

		if (
			rMinX < eMaxX &&
			rMaxX > eMinX &&
			rMinY < eMaxY &&
			rMaxY > eMinY
		) {
			isColliding = true;
			break;
		}
	}

	if (!isColliding) {
		partTwo = Math.max(partTwo, area);
	}
}
```
## Benchmark

```
clk: ~3.03 GHz
cpu: Apple M1 Pro
runtime: node 22.16.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Both                         182.99 ms/iter 186.98 ms     █                
                    (170.26 ms … 199.06 ms) 198.78 ms     █                
                    (  5.83 mb …   5.83 mb)   5.83 mb █▁▁▁█████▁▁▁█▁▁▁▁█▁▁█
```