---
date: 2025-12-07
title: Advent of Code 2025 - Day 7
draft: false
---
I think this was my favourite day of Advent of Code this year. Very interesting puzzle with some super satisfying solutions once you give it a bit of thought (or a lot of thought, in my case).

[Read the full prompt.](https://adventofcode.com/2025/day/7)

## Part 1

So we've got a beam that's being fired down through a Christmas tree-shaped structure of "beam splitters" and we need to count how many times the beam gets split as it makes its way down the grid.

I simulated the beam's journey down through the grid, line by line, by checking the character at each square of the grid and modifying the characters on the next line ("below" it) depending on whether it was a beam (`|`) or a splitter (`^`). Every time we hit a splitter we can increment a counter that tracks our final answer.

```ts
function partOne(input: string[]) {
	const grid: (string | number)[][] = input.map((row) => row.split(""));
	const startX = grid[0].indexOf("S");

	grid[1][startX] = "|";

	let partOne = 0;

	for (const [j, row] of grid.slice(0, -1).entries()) {
		for (const [i, char] of row.entries()) {
			if (char !== "|") continue;

			if (grid[j + 1][i] === "^") {
				grid[j + 1][i - 1] = "|";
				grid[j + 1][i + 1] = "|";

				partOne += 1;
			} else {
				grid[j + 1][i] = "|";
			}
		}
	}

	grid[1][startX] = 1;

	return [partOne, grid] as const;
}
```

I don't think it was strictly necessary to simulate like this, and I probably could've stored the coordinates of the splitters and the beam positions, but this was easier (and more fun!) to visualise in my head. It also means we get a lovely visualisation by the end!

```
.......S.......
.......|.......
......|^|......
......|.|......
.....|^|^|.....
.....|.|.|.....
....|^|^|^|....
....|.|.|.|....
...|^|^|||^|...
...|.|.|||.|...
..|^|^|||^|^|..
..|.|.|||.|.|..
.|^|||^||.||^|.
.|.|||.||.||.|.
|^|^|^|^|^|||^|
|.|.|.|.|.|||.|
```

This then leads us very nicely into Part 2...
## Part 2

The instructions for Part 2 were a little confusing to understand at first, but it boils down to "how many possible paths are there for a beam to take through this tree". If you think about it, every time a beam hits a splitter it essentially creates two copies of itself, either side of the splitter, which continue on downwards. Those positions either side of the splitter could *also* have beams arriving from directly above, or from the opposite side if there are two splitters next to each other. This is the perfect opportunity for some DP (Dynamic Programming 🤨), and also let's us use the result from Part 1, since it effectively represents all of the possible paths the beam can take.

The idea is to work downwards through the grid and add together the number of possible paths from above at each point, to track, by the end, the total number of possible paths that could've been taken by the beam. It took my quite a while to figure this out and properly understand it but I think it's so cool that you can do this and it really doesn't take too long to compute, either! 

I don't know if I explained that very well so here's a diagram that maybe illustrates it better.

```
.....1^2^1.....
.....1.2.1.....
....1^3^3^1....  <-- there are three ways to reach the two positions in the middle here
....1.3.3.1....
```

I don't know if that *diagram* explained that very well so here's the actual code and maybe *that* will illustrate it better.

```ts
function partTwo(grid: (string | number)[][]) {
	for (const [j, row] of grid.entries()) {
		for (const [i, char] of row.entries()) {
			if (char !== "|") continue;

			grid[j][i] = getPointValue(grid, j - 1, i);

			if (grid[j][i - 1] === "^") {
				grid[j][i] += getPointValue(grid, j - 1, i - 1);
			}

			if (grid[j][i + 1] === "^") {
				grid[j][i] += getPointValue(grid, j - 1, i + 1);
			}
		}
	}

	return grid
		.at(-1)
		?.filter((n) => typeof n === "number")
		.reduce((acc, val) => acc + val);
}

function getPointValue(
	grid: (string | number)[][],
	y: number,
	x: number
): number {
	return typeof grid[y][x] === "string" ? 0 : grid[y][x];
}
```
## Benchmark

```
clk: ~3.00 GHz
cpu: Apple M1 Pro
runtime: node 22.16.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Part 1                       293.36 µs/iter 295.63 µs █                    
                    (275.21 µs … 557.38 µs) 441.21 µs █▅▅                  
                    ( 54.63 kb …   1.19 mb) 532.01 kb ████▄▂▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁

Part 2                       893.25 µs/iter 888.83 µs █                    
                      (860.92 µs … 1.26 ms)   1.09 ms █                    
                    (  1.25 mb …   3.01 mb)   2.11 mb ██▆▃▂▂▂▁▁▂▂▂▂▂▂▁▁▁▁▁▁
```