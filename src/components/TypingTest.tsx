import React, { useState, useRef } from "react";
import "./TypingTest.css";

const sampleWords = [
  "some",
  "there",
  "only",
  "take",
  "one",
  "however",
  "home",
  "if",
  "there",
  "very",
  "down",
  "go",
  "old",
  "long",
  "back",
  "give",
  "again",
  "word",
  "get",
  "come.",
];

function TypingTest(): React.ReactElement {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);

  const letterRefs = useRef<(HTMLSpanElement | null)[][]>(
    Array(sampleWords.length)
      .fill(null)
      .map(() => [])
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTestCompleted) return;

    const currentWord = sampleWords[currentWordIndex];
    const typedWord = e.target.value.trim();

    updateLetterColors(typedWord, currentWord);

    if (typedWord === currentWord) {
      setCorrectWords((prev) => prev + 1);

      if (currentWordIndex === sampleWords.length - 1) {
        endTest();
        return;
      }

      setCurrentWordIndex((prev) => prev + 1);
      e.target.value = "";
    }
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

  const handleStart = (): void => {
    setCurrentWordIndex(0);
    setCorrectWords(0);
    setIsTestCompleted(false);
    setTimer(Date.now());

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }

    letterRefs.current.forEach((wordRefs) => {
      wordRefs.forEach((letter) => {
        if (letter) letter.classList.remove("correct", "incorrect");
      });
    });
  };

  const endTest = (): void => {
    setIsTestCompleted(true);
    console.log("Test completed");
    const totalTime = (Date.now() - timer) / 1000;
    const wpm = Math.round((correctWords / totalTime) * 60);
    setWpm(wpm);
  };

  return (
    <div className="typing-test">
      <div className="word-container">
        {sampleWords.map((word, wordIndex) => (
          <div className="word" key={wordIndex}>
            {word.split("").map((letter, letterIndex) => (
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
            ))}
          </div>
        ))}
      </div>
      {!isTestCompleted ? (
        <input
          id="typing-input"
          type="text"
          ref={inputRef}
          onChange={handleTyping}
          placeholder="Type the current word here..."
          disabled
        />
      ) : (
        <p>Test Completed! Your WPM: {wpm}</p>
      )}
      <button onClick={handleStart} id="startBtn">
        Start
      </button>
    </div>
  );
}

export default TypingTest;
