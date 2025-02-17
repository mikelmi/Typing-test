interface WordProps {
  word: string;
  wordIndex: number;
  currentWordIndex: number;
  extraLetters: string;
  letterRefs: React.MutableRefObject<HTMLSpanElement[][]>;
}

export default WordProps;
