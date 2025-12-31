---
date: 2025-12-03
title: Advent of Code 2025 - Day 3
draft: false
---
An appearance from the Duracell Bunny today, as we compare batteries!

[Read the full prompt.](https://adventofcode.com/2025/day/3)

## Part 1
My approach for today was to split up each line of input into an array of digits and then scan through each array, gradually selecting the next largest number available to produce the greatest final result.

We store the indices of each largest digit of the number to allow us to skip over sections of the bank and not waste time searching batteries which wouldn't be valid anyway. Given we know the number of batteries that need to be switched on at the end—parameter `n` in our function—we can also cut off the search early to ensure there are enough batteries left over for the next spots in the bank.

For example, given a bank of 10 batteries where we want to switch on 6 to make the highest number, we know that we can't search any further than index 4 for the first battery, because the remaining 5 batteries in the bank would all then need to be switched on.

```
             b1 b2 b3 b4 b5 b6 
             ↓
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

```ts
function partOne() {
	return input.reduce(
		(total, bank) => total + findLargestJoltageForNBatteries(bank, 2),
		0
	);
}

function findLargestJoltageForNBatteries(
	bank: Array<number>,
	n: number
): number {
	const array: number[] = [];

	for (let i = 0; i < n; i++) {
		const prevIndex = i === 0 ? 0 : array[i - 1] + 1;

		array.push(maxIndex(bank, prevIndex, bank.length - (n - (i + 1))));
	}

	return array.reduce((acc, val) => 10 * acc + bank[val], 0);
}

function maxIndex(array: Array<number>, start: number, end: number): number {
	let m = start;

	for (let i = start; i < end; i++) {
		if (array[i] > array[m]) m = i;
	}

	return m;
}
```

## Part 2
We're just doing the same thing here, but looking for 12 digits instead of just 2. 

```ts
function partTwo() {
	return input.reduce(
		(total, bank) => total + findLargestJoltageForNBatteries(bank, 12),
		0
	);
}
```

## Benchmark

```
clk: ~3.03 GHz
cpu: Apple M1 Pro
runtime: node 22.16.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
Part 1                        43.91 µs/iter  43.54 µs  █                   
                     (42.29 µs … 267.50 µs)  55.13 µs ▂█                   
                    (  2.43 kb … 262.59 kb)  42.15 kb ███▄▃▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁

Part 2                        84.91 µs/iter  84.08 µs  █                   
                     (80.50 µs … 950.75 µs) 120.00 µs ▂█                   
                    (  6.71 kb … 220.11 kb)  37.54 kb ███▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
```

One thing I wondered about while writing this was how these benchmarks might scale in relation to the number of batteries that need to be switched on. As the number of batteries being switched on approaches the total number of batteries in the bank, the number of actual searches we can do should reduce because there are fewer numbers that are possible within the "space". For example, if we have a battery bank of 10 batteries and we want to switch on all 10, there's only one possible order in which they can be switched on (given the constraint that the order of the batteries can't change).

But that's not what I see when I benchmark my code. Our AoC input consists of a list of numbers with 100 digits, so we can benchmark all the way up to that amount and get the following graph:

```
------------------------------------------- -------------------------------
1                             68.69 µs/iter  68.42 µs █                    
                     (66.96 µs … 277.21 µs)  83.79 µs █ ▃                  
                    ( 23.09 kb … 333.22 kb)  52.02 kb █▅█▂▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

8                            202.71 µs/iter 201.58 µs █                    
                    (199.88 µs … 407.21 µs) 243.08 µs █▃                   
                    (106.38 kb … 543.90 kb) 106.85 kb ██▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

64                           460.29 µs/iter 452.46 µs █                    
                    (447.33 µs … 743.17 µs) 576.17 µs █▂                   
                    (852.63 kb …   1.51 mb)   1.24 mb ██▃▂▁▁▁▁▁▁▁▁▁▁▂▂▂▁▁▁▁

100                          608.57 µs/iter 597.13 µs █                    
                    (588.54 µs … 813.67 µs) 721.88 µs █▇                   
                    (  2.31 mb …   2.31 mb)   2.31 mb ██▂▂▂▁▁▁▁▁▁▁▁▁▃▄▂▁▁▁▁

                             ┌                                            ┐
                        $num                                           ⡠⠔⠊ 608.57 µs
                                                                   ⢀⠤⠒⠉   
                                                                ⣀⠔⠊⠁      
                                                            ⢀⡠⠒⠉          
                                                          ⡠⠊⠁             
                                                        ⡠⠊                
                                                      ⡠⠊                  
                                                    ⡠⠊                    
                                                  ⢀⠜                      
                                                ⢀⠔⠁                       
                                              ⢀⠔⠁                         
                                            ⢀⠔⠁                           
                                        ⢀⡠⠔⠊⠁                             
                                     ⣀⠤⠒⠁                                 
                                 ⢀⡠⠒⠉                                     
                              ⡠⠔⠊⠁                                         68.69 µs
                             └                                            ┘

summary
  1
   2.95x faster than 8
   6.7x faster than 64
   8.86x faster than 100

```

The time taken to run seems to scale linearly with the number of batteries being switched on, which is not what I expected. Something to think about...