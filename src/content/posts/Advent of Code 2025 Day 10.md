---
date: 2025-12-10
title: Advent of Code 2025 - Day 10
draft: false
---
A bit of linear programming on my birthday, how lovely!

[Read the full prompt.](https://adventofcode.com/2025/day/10)

## Part 1
My idea for solving Part 1 was to represent the lights as a `Set` of numbers, and then use the use newly available [`symmetricDifference`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/symmetricDifference) method to toggle the lights on and off. Doing `setA.symmetricDifference(setB)` will return numbers which are in either `setA` or `setB`, but not *both*. So for a set of lights `lights := {1, 3, 4}` we can turn off lights 1 and 4, and switch on light 2 by doing `lights.symmetricDifference({1, 2, 4})` (this isn't real JS notation but you get the picture).

The next thing I did was write a [`combinations`](https://github.com/benslv/aoc/blob/master/2025/utils/combinations.ts) generator to gradually yield all of the possible combinations of button presses. One thing to note is we don't need to think about any combinations containing multiple of the same button wiring schematic, because they will effectively "cancel out" and can either be represented by a single occurrence, or zero occurrences (e.g. the symmetric difference between {1, 2} and {1, 2} is an empty set, which is the same as never having toggled those lights in the first place).

So let's generate all of the combinations of our available button press schematics, from the smallest combination (i.e. 1) to the largest, and break when we find a combination that leads to all of the lights being on. 

## Part 2
Suddenly these buttons start incrementing counters on a *different* machine instead, and we have to also make sure these counters hit their required values too. It's a lot trickier and will require a different approach.

If you're smarter than me you'll probably very quickly recognise this as a [Linear Programming](https://github.com/benslv/aoc/blob/master/2025/utils/combinations.ts) question. I might revisit and write out an explanation in full (partly for my own benefit) but the gist is that we can represent the system of button presses as a matrix and the counter values as a vector, and then do some Maths to it to have it tell us what the minimum number of button presses required to hit the desired counter values is.

I opted to use a [Linear Programming library](https://github.com/IanManske/YALPS) to "solve this for me", which might be considered cheating by some people but I'm not sure I mind too much. That's what tools and libraries are made for in the first place, right?

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
