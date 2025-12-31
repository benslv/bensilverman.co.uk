---
date: 2025-12-06
title: Advent of Code 2025 - Day 6
draft: false
---
Oh how I envy Python's `zip()` function...

[Read the full prompt.](https://adventofcode.com/2025/day/6)

## Part 1

I think today's trickiness was mainly from figuring out what the question wanted you to do, and how it code something that Did It Correctly.

Unfortunately, JS doesn't have a great standard library of array functions for stuff like this, so I resorted to writing my own `transpose()` function and using it to swap the rows and the columns of my input.

```ts
function transpose(matrix: number[][]): number[][] {
	const rows = matrix.length;

	const cols = matrix[0].length;
	const grid: number[][] = [];

	for (let j = 0; j < cols; j++) {
		grid.push([]);
		for (let i = 0; i < rows; i++) {
			grid[j].push(matrix[i][j]);
		}
	}

	return grid;
}
```

We can then reduce down our list of columns, combining each one using  the operator that's provided—adding or multiplying—and sum everything up to get our final answer!

```ts
const funcMap: Record<string, (a: number, b: number) => number> = {
	"+": (a: number, b: number) => a + b,
	"*": (a: number, b: number) => a * b,
};

function partOne() {
	const rows = input
		.slice(0, -1)
		.map((row) => row.trim().split(/\s+/).map(Number));

	const ops = input.at(-1)!.trim().split(/\s+/);

	return transpose(rows).reduce(
		(acc, row, i) => acc + row.reduce(funcMap[ops[i]]),
		0
	);
}
```

## Part 2

Unfortunately I couldn't use that same `transpose` function for the second part of Day 6. We still need to process the groups of numbers in their columns, but now we *also* need to read the numbers in right-to-left, *and* in columns.

So something like...

```
123
 45
  6
+  
```

...would be `356 + 24 + 1 = 381`.

I opted to do a single scan from right to left of the entire input and process the columns as I went. We can create a temporary list of items by reading in all of the characters from a given column of input. Eventually we will see a character like `+` or `*`, too, and can store that as the operator needed for the calculation. And then, when we read in an entire column of empty strings, we know we've fully processed a single "group" of numbers and can add that to the final answer.

```ts
function partTwo() {
	const numCols = input[0].length;
	const numRows = input.length;

	const transposedInput: number[][] = [[]];
	const ops: string[] = [];

	for (let i = 0; i < numCols; i++) {
		const items = [];

		for (let j = 0; j < numRows; j++) {
			items.unshift(input[j][i]);
		}

		const [op, ...nums] = items;

		const num = nums.toReversed().join("").trim();

		if (num.length === 0) {
			transposedInput.push([]);
			continue;
		}

		if (op !== " ") {
			ops.push(op);
		}

		transposedInput.at(-1)!.push(Number(num));
	}

	return transposedInput.reduce(
		(acc, nums, i) => acc + nums.reduce(funcMap[ops[i]]),
		0
	);
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