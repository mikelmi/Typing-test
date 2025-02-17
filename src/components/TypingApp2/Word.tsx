import Letter from "./Letter";
import WordProps from "./types/WordProps";

function Word({
  word,
  wordIndex,
  currentWordIndex,
  extraLetters,
  letterRefs,
}: WordProps): React.ReactElement {
  return (
    <div
      className={`word ${wordIndex === currentWordIndex ? "active" : ""}`}
      key={wordIndex}
    >
      {word.split("").map((letter, letterIndex) => (
        <Letter
          key={letterIndex}
          letter={letter}
          letterIndex={letterIndex}
          wordIndex={wordIndex}
          letterRefs={letterRefs}
        />
      ))}
      {wordIndex === currentWordIndex && extraLetters && (
        <>
          {extraLetters.split("").map((extra, index) => (
            <span key={index} className="extra-letter incorrect">
              {extra}
            </span>
          ))}
        </>
      )}
    </div>
  );
}

export default Word;
