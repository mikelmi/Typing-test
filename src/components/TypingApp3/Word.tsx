import Letter from "./Letter";

type Props = {
  word: string;
  typedWord?: string;
};

const Word = ({ word, typedWord }: Props) => {
  const letters = word.split("");
  const typedLetters = typedWord?.split("") || [];
  const extraLetters = typedLetters.slice(letters.length);

  const wordClass =
    word !== typedWord && word.length <= (typedWord?.length || 0)
      ? "word error"
      : "word";

  return (
    <span className={wordClass}>
      {letters.map((letter, letterIndex) => (
        <Letter
          key={letterIndex}
          letter={letter}
          typedLetter={typedLetters[letterIndex]}
        />
      ))}
      {extraLetters.map((letter, letterIndex) => (
        <Letter key={letterIndex} letter="" typedLetter={letter} />
      ))}
    </span>
  );
};

export default Word;
