---
date: 2025-12-02
title: Advent of Code 2025 - Day 2
draft: false
---
Thank god I know how to regex...otherwise this would've been painful.

[Read the full prompt.](https://adventofcode.com/2025/day/2)

# Part 1

Part 1 of Day 2 asks for us to take an interval and calculate how many numbers within that interval are made up of some sequence of digits repeated exactly twice (e.g. `11` and `22` in the range `11-22`)

```ts
import { bench, run } from "mitata";
import { readInput } from "../utils";

const P1_REGEX = /^(\d+)\1$/;

const input = await readInput();

const ranges = input
	.at(0)
	.split(",")
	.map((r) => r.split("-").map(Number));

let partOne = 0;

for (const [start, end] of ranges) {
	for (let i = start; i <= end; i++) {
		if (P1_REGEX.test(i.toString())) partOne += i;
	}
}
```

The star of this solution is the regex, `^(\d+)\1$`, which does the following:
- `^` - matches the beginning of the string
- `(\d+)` - creates a "[capture group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Capturing_group)" around one or more digit characters
- `\1` - is a "[back reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference)" to the first capture group we created
- `$` - matches the end of the string

Using `^` and `$` ensure we don't match any substrings containing repeating sequences of digits (e.g. `123231`)!
# Part 2
The problem statement then changes very slightly for Part 2, and instead asks us to find all of the numbers within a given interval which are made up of a sequence of digits that repeats *at least* twice (e.g. `343434`, `1111`).

This would be really horrible, if not for that fact that we can reuse basically all of our Part 1 solution just by changing the regex slightly.

✨ `^(\d+)\1$` becomes `^(\d+)\1+$` ✨

With this new regex we can create the capture group and then match strings with *one or more* of the back references, instead of exactly one.

# Benchmark
```
clk: ~2.93 GHz
cpu: Apple M1 Pro
runtime: node 22.16.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Part 1 & 2                   266.81 ms/iter 264.07 ms  ▂█                  
                    (262.53 ms … 292.19 ms) 274.98 ms ▅██                  
                    (  1.02 mb …  16.50 mb)   8.06 mb ███▇▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▇
```

I haven't tried this out yet but you could write this same test using purely mathematical operations instead of a regex and it might be faster? Something like this:

```ts
function testNumber(n: number): boolean {
	const numDigits = Math.floor(Math.log10(n) + 1);

	// Needs to have an even number of digits to split cleanly.
	if (numDigits % 2 !== 0) return false;

	const firstHalf = Math.floor(n / Math.pow(10, numDigits / 2))
	const secondHalf = n % Math.pow(10, numDigits / 2)

	return firstHalf === secondHalf
}
```