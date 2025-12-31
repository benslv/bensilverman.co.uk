---
date: 2025-07-13
title: Guessing Your Wordle Games
draft: true
---
- **Constraint:** need to be playing on hard mode to assume that all guess information has be used in a subsequent guess
	- otherwise subsequent guesses can have no relation to the previous one and that's a bit harder to do anything with
	- less interesting, all.

**Convert guess to number array**
```ts
function checkGuess(guess: string, answer: string): (0 | 1 | 2)[] {
	const result: (0 | 1 | 2)[] = [0, 0, 0, 0, 0];

	// Find green squares
	for (let i = 0; i < guess.length; i++) {
		if (guess[i] === answer[i]) {
			result[i] = 2;
		}
	}

	// Find yellow squares
	for (let i = 0; i < guess.length; i++) {
		if (result[i] !== 0) continue;

		if (answer.indexOf(guess[i]) !== -1) {
			result[i] = 1;
		}
	}

	return result;
}
```

