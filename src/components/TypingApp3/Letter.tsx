type Props = {
  letter: string;
  typedLetter?: string;
};

const Letter = ({ letter, typedLetter }: Props) => {
  const classes = [
    "letter",
    letter === typedLetter && "correct",
    typedLetter && typedLetter !== letter && "error",
    !letter && "extra",
  ].filter((item) => !!item);

  return <span className={classes.join(" ")}>{letter || typedLetter}</span>;
};

export default Letter;
