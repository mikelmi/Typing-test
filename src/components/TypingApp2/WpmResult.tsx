import React from "react";
import WpmResultProps from "./types/WpmResultProps";

function WpmResult({ wpm }: WpmResultProps): React.ReactElement {
  return <p>Test Completed! Your WPM: {wpm}</p>;
}

export default WpmResult;
