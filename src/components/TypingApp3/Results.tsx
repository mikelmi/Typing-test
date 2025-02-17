type Props = {
  wpm: number;
};

const Results = ({ wpm }: Props) => {
  return (
    <p className="results">
      Test Completed! Your result is <b>{wpm} words per minute</b>
    </p>
  );
};

export default Results;
