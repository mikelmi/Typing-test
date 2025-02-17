interface TypingInputProps {
  typedWord: string;
  currentWordIndex: number;
  sampleWords: string[];
  isTestCompleted: boolean;
  setCorrectWords: React.Dispatch<React.SetStateAction<number>>;
  setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>;
  setTypedWord: React.Dispatch<React.SetStateAction<string>>;
  setExtraLetters: React.Dispatch<React.SetStateAction<string>>;
  endTest: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  letterRefs: React.MutableRefObject<HTMLSpanElement[][]>;
}

export default TypingInputProps;
