interface LetterProps {
  letter: string;
  letterIndex: number;
  wordIndex: number;
  letterRefs: React.MutableRefObject<HTMLElement[][]>;
}

export default LetterProps;
