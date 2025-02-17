import "./App.css";
import TypingApp from "./components/TypingApp2/TypingApp";
import TypingApp3 from "./components/TypingApp3";

function App() {
  return (
    <>
      <div className="app">
        <h1>Typing Speed Test</h1>
        <TypingApp />
        <TypingApp3 />
      </div>
    </>
  );
}

export default App;
