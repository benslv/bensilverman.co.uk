import { createSignal } from "solid-js";
import words from "./words.json";

export function Wordle() {
	const [answer, setAnswer] = createSignal<string>("");
	const [guesses, setGuesses] = createSignal<string>("");

	const [paths, setPaths] = createSignal();

	const getPaths = () => {
		const paths = calculatePaths(guesses(), answer());

		setPaths(paths);
	};

	return (
		<>
			<input
				name="answer"
				type="text"
				onInput={(event) => setAnswer(event.target.value)}
				value={answer()}
			/>
			<textarea
				name="guesses"
				onInput={(event) => setGuesses(event.target.value)}
				value={guesses()}
			/>
			<button type="submit" onClick={getPaths}>
				Submit
			</button>
			<p>{JSON.stringify(paths())}</p>
		</>
	);
}

const guessMap = new Map([
	["⬛", 0],
	["⬜", 0],
	["🟨", 1],
	["🟩", 2],
]);

function calculatePaths(guesses: string, answer: string) {
	// Format to number array.
	const lines = guesses
		.split("\n")
		.slice(2)
		.map((line) =>
			[...line].map((letter) => guessMap.get(letter)!)
		) as GuessResult[];

	type GuessResult = (0 | 1 | 2)[];
	function checkGuess(guess: string, answer: string): GuessResult {
		const result: GuessResult = [0, 0, 0, 0, 0];

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

	function getPossibleWordsForClue(clue: GuessResult, answer: string) {
		return words.filter(
			(word) => checkGuess(word, answer).join("") === clue.join("")
		);
	}

	function getPossiblePaths(
		lines: GuessResult[],
		answer: string
	): string[][] {
		const paths: string[][] = [];

		recurse(lines.slice(0, -1), [answer]);

		function recurse(clues: GuessResult[], currentPath: string[]) {
			if (clues.length === 0) {
				paths.push(currentPath);
				return;
			}

			const clue = clues.at(-1)!;

			const possibleWords = getPossibleWordsForClue(
				clue,
				currentPath.at(0)!
			);

			for (const word of possibleWords) {
				recurse(clues.slice(0, -1), [word, ...currentPath]);
			}
		}

		return paths;
	}

	const possiblePaths = getPossiblePaths(lines, answer);
	console.log(`${possiblePaths.length} possible paths generated.`);

	// fs.writeFileSync("output.txt", "");
	// fs.writeFileSync("output.txt", JSON.stringify(possiblePaths, null, 2));

	return possiblePaths;

	// const startingWordCounts = Object.entries(
	// 	possiblePaths.reduce((acc: Record<string, number>, val: string[]) => {
	// 		acc[val[0]] = (acc[val[0]] ?? 0) + 1;

	// 		return acc;
	// 	}, {})
	// ).toSorted((a, b) => b[1] - a[1]);

	// const totalStartingWords = startingWordCounts.reduce(
	// 	(acc, val) => acc + val[1],
	// 	0
	// );

	// console.log(
	// 	`Most likely starting word: ${startingWordCounts[0][0]} with frequency ${startingWordCounts[0][1]}/${totalStartingWords}`
	// );
}
