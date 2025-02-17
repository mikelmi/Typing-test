import TypingInputProps from "./types/TypingInputProps";

function TypingInput({
  typedWord,
  currentWordIndex,
  sampleWords,
  isTestCompleted,
  setCorrectWords,
  setCurrentWordIndex,
  setTypedWord,
  setExtraLetters,
  endTest,
  inputRef,
  letterRefs,
}: TypingInputProps): React.ReactElement {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isTestCompleted) return;
    const currentWord = sampleWords[currentWordIndex];
    const trimmedWord = typedWord.trim();
    console.log(currentWord);
    console.log(trimmedWord);

    if (currentWord === trimmedWord || e.key === " ") {
      e.preventDefault();

      if (trimmedWord === currentWord) {
        setCorrectWords((prev) => prev + 1);
      }

      if (currentWordIndex === sampleWords.length - 1) {
        endTest();
        return;
      }

      setCurrentWordIndex((prev) => prev + 1);
      setTypedWord("");
      setExtraLetters("");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTestCompleted) return;

    const wordValue = e.target.value;
    const currentWord = sampleWords[currentWordIndex];

    setTypedWord(wordValue);

    if (wordValue.length > currentWord.length) {
      setExtraLetters(wordValue.slice(currentWord.length));
    } else {
      setExtraLetters("");
    }

    updateLetterColors(wordValue, currentWord);
  };

  const updateLetterColors = (typedWord: string, currentWord: string): void => {
    const letters = letterRefs.current[currentWordIndex];

    if (letters) {
      letters.forEach((letter, index) => {
        if (!letter) return;

        const typedLetter = typedWord[index];
        const currentLetter = currentWord[index];

        letter.classList.remove("correct", "incorrect");

        if (typedLetter === currentLetter) {
          letter.classList.add("correct");
        } else if (typedLetter) {
          letter.classList.add("incorrect");
        }
      });
    }
  };

  return (
    <input
      id="typing-input"
      type="text"
      value={typedWord}
      ref={inputRef}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      placeholder="Type the current word here..."
      disabled
    />
  );
}

export default TypingInput;
