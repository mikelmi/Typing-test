import Word from "./Word";

type Props = {
  words: string[];
  typedWords: string[];
};

const Words = ({ words, typedWords }: Props) => {
  return (
    <div className="words">
      {words.map((word, wordIndex) => (
        <Word key={wordIndex} word={word} typedWord={typedWords[wordIndex]} />
      ))}
    </div>
  );
};

export default Words;
