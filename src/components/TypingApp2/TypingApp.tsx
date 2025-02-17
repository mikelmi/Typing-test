import React, { useState, useRef } from "react";
import Word from "./Word";
import WpmResult from "./WpmResult";
import TypingInput from "./TypingInput";
import "./TypingTest.css";

const sampleWords = [
  "some",
  "there",
  "only",
  "take",
  // "one",
  // "however",
  // "home",
  // "if",
  // "there",
  // "very",
  // "down",
  // "go",
  // "old",
  // "long",
  // "back",
  // "give",
  // "again",
  // "word",
  // "get",
  // "come.",
];

function TypingApp(): React.ReactElement {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [extraLetters, setExtraLetters] = useState("");

  const letterRefs = useRef<HTMLSpanElement[][]>(
    Array(sampleWords.length)
      .fill(null)
      .map(() => [])
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleStart = (): void => {
    setCurrentWordIndex(0);
    setCorrectWords(0);
    setIsTestCompleted(false);
    setTimer(Date.now());
    setTypedWord("");
    setExtraLetters("");
    letterRefs.current.forEach((word) =>
      word.forEach((letter) => (letter.className = "letter"))
    );

    inputRef.current!.disabled = false;
    inputRef.current!.focus();
  };

  const endTest = (): void => {
    setTypedWord("");
    inputRef.current!.disabled = true;
    setIsTestCompleted(true);
    const totalTime = (Date.now() - timer) / 1000;
    const wpm = Math.round((correctWords / totalTime) * 60);
    setWpm(wpm);
  };

  return (
    <div className="typing-test">
      <div className="word-container">
        {sampleWords.map((word, wordIndex) => (
          <Word
            key={wordIndex}
            word={word}
            wordIndex={wordIndex}
            currentWordIndex={currentWordIndex}
            extraLetters={wordIndex === currentWordIndex ? extraLetters : ""}
            letterRefs={letterRefs}
          />
        ))}
      </div>

      <TypingInput
        typedWord={typedWord}
        currentWordIndex={currentWordIndex}
        sampleWords={sampleWords}
        isTestCompleted={isTestCompleted}
        setCorrectWords={setCorrectWords}
        setCurrentWordIndex={setCurrentWordIndex}
        setTypedWord={setTypedWord}
        setExtraLetters={setExtraLetters}
        endTest={endTest}
        inputRef={inputRef}
        letterRefs={letterRefs}
      />

      {isTestCompleted && <WpmResult wpm={wpm} />}

      <button id="startBtn" onClick={handleStart}>
        Start Test
      </button>
    </div>
  );
}

export default TypingApp;
