import LetterProps from "./types/LetterProps";

function Letter({
  letter,
  letterIndex,
  wordIndex,
  letterRefs,
}: LetterProps): React.ReactElement {
  return (
    <span
      className="letter"
      key={letterIndex}
      ref={(el) => {
        if (el) {
          letterRefs.current[wordIndex][letterIndex] = el;
        }
      }}
    >
      {letter}
    </span>
  );
}

export default Letter;
