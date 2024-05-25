import { useState } from "react";

const Statistics = ({ all, average, positive }) => {
  if (all >= 1) {
    return (
      <>
        <p>all: {all}</p>
        <p>average: {average}</p>
        <p>positive: {positive} %</p>
      </>
    );
  }

  return <p>No feedback given</p>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const calculateStatistics = ({ good, neutral, bad }) => {
    const newAll = good + neutral + bad;
    setAll(newAll);

    const newAverage = (good - bad) / newAll;
    setAverage(newAverage);

    const newPositive = (good / newAll) * 100;
    setPositive(newPositive);
  };

  const handleClickGood = () => {
    const newGood = good + 1;
    setGood(newGood);

    const dataForCalculations = { good: newGood, neutral, bad };
    calculateStatistics(dataForCalculations);
  };

  const handleClickNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);

    const dataForCalculations = { good, neutral: newNeutral, bad };
    calculateStatistics(dataForCalculations);
  };

  const handleClickBad = () => {
    const newBad = bad + 1;
    setBad(newBad);

    const dataForCalculations = { good, neutral, bad: newBad };
    calculateStatistics(dataForCalculations);
  };

  return (
    <main>
      <h1>Give feedback</h1>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>
      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <Statistics all={all} average={average} positive={positive} />
    </main>
  );
};

export default App;
