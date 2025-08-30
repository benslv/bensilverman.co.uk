import Styles from "./WordleGame.module.css";

type WordleGameProps = {
	guesses: Array<string>;
	answer: string;
};

export function WordleGame({ guesses }: WordleGameProps) {
	return guesses.map((line) => (
		<div>
			{line.split("").map((letter) => (
				<span class={Styles.letter}>{letter}</span>
			))}
		</div>
	));
}
