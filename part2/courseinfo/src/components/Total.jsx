function Total({ parts }) {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);

  return <strong>total of {total} exercises</strong>;
}

export default Total;
