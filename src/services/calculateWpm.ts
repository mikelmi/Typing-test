export default function calculateWpm(
  words: string[],
  typedWords: string[],
  totalTime: number
): number {
  const correctWordsCount = words.filter((word, index) => {
    return word === typedWords[index];
  }).length;

  return Math.round((correctWordsCount / totalTime) * 60);
}
