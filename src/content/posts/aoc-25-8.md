---
date: 2025-12-08
title: Advent of Code 2025 - Day 8
draft: false
---
Coincidentally, also the day I put my *own* Christmas lights up!

[Read the full prompt.](https://adventofcode.com/2025/day/8)

## Part 1 & 2
I'll cover both parts at the same time today because you basically just need to do the same thing for each, but Part 2 requires you to do it for longer.

To summarise today's problem, you're given a list of Christmas light IDs, and a map of which lights connect to which. When you connect two lights together, they form a **circuit**. If two lights are already in a circuit when you connect them, the two circuits **merge**.

Straight away my mind started thinking about sets and unioning them together. We just need to do this over and over again, deleting old circuits once they've been connected together. We can track how many times we do this, and print out our answer for Part 1, then continue until there's only one circuit left, at which point with have our Part 2 answer :)

You can view [the full solution]() on my GitHub, because it's quite long to post here, but the main part is:

```ts
for (const c of circuits) {
	if (c.has(a)) aCircuit = c;
	if (c.has(b)) bCircuit = c;
}

circuits.delete(aCircuit!);
circuits.delete(bCircuit!);

circuits.add(aCircuit!.union(bCircuit!));
```

This finds the circuits that contain the two lights (`a` and `b`) which need to be merged, then combines them together into one mega-circuit and deletes the two smaller circuits.
## Benchmark

```
clk: ~2.93 GHz
cpu: Apple M1 Pro
runtime: node 22.16.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Part 1 & 2                    14.72 µs/iter  14.42 µs   █                  
                       (12.79 µs … 1.17 ms)  20.83 µs   █▇▂                
                    (656.00  b … 152.39 kb)  23.00 kb ▁▆███▅▂▂▂▂▂▂▂▂▁▁▁▁▁▁▁
```

This is a bit misleading, because it's actually much slower if we include the time taken to sort all the points by their distance from each other :^)

```
clk: ~3.02 GHz
cpu: Apple M1 Pro
runtime: node 22.16.0 (arm64-darwin)

benchmark                     avg (min … max) p75 / p99    (min … top 1%)
--------------------------------------------- -------------------------------
Part 1 & 2 (+sorting)          542.97 ms/iter 543.80 ms     █                
                      (536.48 ms … 567.32 ms) 545.21 ms ▅   █▅ ▅  ▅▅▅    ▅▅ ▅
                      ( 13.67 mb …  13.67 mb)  13.67 mb █▁▁▁██▁█▁▁███▁▁▁▁██▁█
```

But we can leave that out of the official benchmark and chalk it up to "preparation time" 😉