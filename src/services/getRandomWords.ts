import words from "../data/popularWords.json";

const getRandomWords = (count = 5): string[] => {
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default getRandomWords;
