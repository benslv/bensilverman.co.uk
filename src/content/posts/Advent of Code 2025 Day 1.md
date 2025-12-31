---
date: 2025-12-01
title: Advent of Code 2025 - Day 1
draft: false
---
> Advent of Code is [nearly over](https://www.reddit.com/r/adventofcode/comments/1ocwh04/changes_to_advent_of_code_starting_this_december/) for this year and I thought I would try and do some quick write-ups of my solutions, mainly as a bit of fun and to help me improve my writing a little bit. So far it's been quite a good level of difficulty, with nothing outstandingly horrendous, but a few which have been challenging. I don't know whether the plan is to scale Days 1-12 in such a way that Day 12 is as difficult as Day 25 would've been in previous years. It'll probably be similar?

---

# Day 1
[Read the full prompt.](https://adventofcode.com/2025/day/1)

## Part 1
Quite a straightforward task: simulate a rotating dial on a safe, and count up how many times the dial lands at position `0` after each turn.

Just increment or decrement `rot` depending on the input line, and `mod` it to keep it within the 0-99 range specified.

```ts
const input = await readInput().then((data) =>
	Array.from(data.join("\n").matchAll(ROTATON_REGEX))
);

function partOne() {
	let rot = 50;
	let answer = 0;

	for (const [, direction, amount] of input) {
		switch (direction) {
			case "L": {
				rot = mod(rot - Number(amount), 100);
				break;
			}
			case "R": {
				rot = mod(rot + Number(amount), 100);
			}
		}

		if (rot === 0) answer += 1;
	}

	return answer;
}
```

It's super fun that you actually need to write a custom `mod` function instead of just using `%`, like in a language like Python. This is because the `%` operator in JavaScript doesn't actually calculate the modulus of a number, but returns the *remainder* instead, so something like `-3 % 4` will actually return `-3` instead of the `1` that we want.

Here's a function you can use to get mods how you want them:
```ts
const mod = (n: number, m: number) =>  ((n % m) + m) % m;
```

## Part 2
Part 2 is a little bit more involved, and asks that you calculate the number of times the dial *passes* `0`, not just landing on it. I opted for the lazy approach and essentially just broke down my input into lots of single-step "left" and "right" turns. By doing this, you can basically then solve the problem the same as in Part 1.

```ts
function partTwo() {
	let rot = 50;
	let answer = 0;

	for (const [, direction, amount] of input) {
		switch (direction) {
			case "L": {
				for (let i = 0; i < Number(amount); i++) {
					rot = mod(rot - 1, 100);

					if (rot === 0) answer += 1;
				}

				break;
			}
			case "R": {
				for (let i = 0; i < Number(amount); i++) {
					rot = mod(rot + 1, 100);

					if (rot === 0) answer += 1;
				}
			}
		}
	}

	return answer;
}
```

It's not very fast—about 4x slower than my Part 1 solution—but it's very easy to implement. A better approach would probably be to look at where you land after the movement and work out whether you would've had to pass `0` to get there.

## Benchmarks
```
clk: ~3.07 GHz
cpu: Apple M1 Pro
runtime: node 22.16.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Part 1:                      121.41 µs/iter 121.00 µs  █                   
                    (117.79 µs … 224.92 µs) 146.00 µs  █▄                  
                    ( 32.00  b … 227.59 kb) 923.38  b ▂██▅▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

Part 2:                        5.21 ms/iter   5.24 ms   ▄▂█    ▂           
                        (5.13 ms … 5.42 ms)   5.35 ms  ▆███▃   █           
                    (504.00  b … 504.00  b) 504.00  b ▅██████▆▇██▇▄█▆▅▄▅▂▂▄
```