import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all >= 1) {
    {
      /* <table>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
    </table> */
    }

    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
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
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </main>
  );
};

export default App;
