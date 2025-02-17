import Words from "./Words";

import "./TypingApp.css";
import { useEffect, useMemo, useRef, useState } from "react";
import getRandomWords from "../../services/getRandomWords";
import Results from "./Results";
import calculateWpm from "../../services/calculateWpm";

const WORDS_COUNT = 5;

const TypingApp3 = () => {
  const [inProgress, setInProgress] = useState(false);

  const completedCount = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const [words, setWords] = useState(() => getRandomWords(WORDS_COUNT));
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [typedWord, setTypedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>();
  const [wpm, setWpm] = useState<number | undefined>(undefined);

  const lastLetter = useMemo(() => words[words.length - 1]?.slice(-1), [words]);
  const lastTypedLetter = useMemo(
    () => typedWords[typedWords.length - 1]?.slice(-1),
    [typedWords]
  );

  useEffect(() => {
    if (typedWords.length === words.length && lastLetter === lastTypedLetter) {
      handleEnd();
      completedCount.current++;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedWords, lastTypedLetter]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTypedWord(value);

    if (wordIndex < typedWords.length) {
      setTypedWords(
        typedWords.map((word, index) => {
          if (index === wordIndex) {
            return value;
          }
          return word;
        })
      );
    } else {
      setTypedWords([...typedWords, value]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      if (typedWord) {
        setWordIndex((index) => index + 1);
      }
      setTypedWord("");
    }
  };

  const handleStart = (): void => {
    if (completedCount.current > 0) {
      setWords(getRandomWords(WORDS_COUNT));
    }
    setInProgress(true);
    setStartTime(Date.now());
    setWpm(undefined);

    if (inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
  };

  const handleEnd = (): void => {
    setInProgress(false);
    setTypedWord("");
    setTypedWords([]);
    setWordIndex(0);

    if (startTime) {
      const totalTime = (Date.now() - startTime) / 1000;
      setWpm(calculateWpm(words, typedWords, totalTime));
    }
  };

  return (
    <div className="app-3">
      <h1>TypingApp3</h1>
      <Words words={words} typedWords={typedWords} />
      <input
        className="input"
        type="text"
        value={typedWord}
        placeholder="Type the current word here..."
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={!inProgress}
        ref={inputRef}
      />

      {wpm !== undefined && <Results wpm={wpm} />}
      <button className="btn" onClick={handleStart}>
        Start Test
      </button>
    </div>
  );
};

export default TypingApp3;
