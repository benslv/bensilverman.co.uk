---
date: 2025-12-11
title: Advent of Code 2025 - Day 11
draft: false
---
Finally some more graph traversal!

[Read the full prompt.](https://adventofcode.com/2025/day/11)

## Part 1

Simple breadth-first search for Part 1. We want to know how many routes are possible to get from the start to the finish.

```ts
function partOne() {
	const paths = [];

	const queue: Array<Array<string>> = [["you"]];

	while (queue.length > 0) {
		const path = queue.shift()!;
		const node = path[path.length - 1];

		if (node === "out") {
			paths.push(path);
			continue;
		}

		const children = nodes.get(node);

		for (const child of children ?? []) {
			queue.push([...path, child]);
		}
	}

	return paths.length;
}
```

## Part 2

In Part 2, we start from `svr` instead of `you` and there are *so many* more potential paths that could be visited. We are also only interested in the paths that pass through `dac` and `fft`, too, so a bit of added complication there.

There will be many moments where we are traversing from the same point over and over again, so let's introduce some memoization to cache the number of valid routes (i.e. passing through `dac` and `fft`) from a given point to the finish so we can reuse the value the next time we see it.

```ts
function partTwo(): number {
	const countPaths = memoize(
		(here: string, dac: boolean, fft: boolean): number => {
			let dacVisited = dac;
			let fftVisited = fft;

			switch (here) {
				case "out":
					return Number(dac && fft);
				case "dac":
					dacVisited = true;
					break;
				case "fft":
					fftVisited = true;
					break;
			}

			const result = Array.from(nodes.get(here) ?? []).reduce(
				(total, v) => total + countPaths(v, dacVisited, fftVisited),
				0
			);

			return result;
		}
	);

	return countPaths("svr", false, false);
}
```

Once we see that we're at `out` we can return `Number(dac && fft)` so the route only counts towards the total number of valid routes if *both* required points have been visited. Otherwise, the route will be a `0` and not count towards the total.

## Benchmark
```
clk: ~3.03 GHz
cpu: Apple M1 Pro
runtime: node 22.16.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Part 1                        21.99 ms/iter  22.10 ms  █▂▂ ▂    ▂          
                      (21.75 ms … 22.61 ms)  22.44 ms  ███▅█  ▅ █     ▅    
                    ( 10.96 mb …  11.07 mb)  11.00 mb ▇█████▁▇█▁█▇▁▁▇▁█▁▁▁▇

Part 2                         1.55 ms/iter   1.56 ms  █                   
                        (1.35 ms … 2.41 ms)   2.17 ms ▂█▄                  
                    (  1.50 mb …   4.35 mb)   3.31 mb ███▅▃▃▂▁▁▁▁▁▂▃▃▃▄▂▃▂▁
```
