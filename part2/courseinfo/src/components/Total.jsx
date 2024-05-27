function Total({ exercises }) {
  let total = 0;
  for (let i = 0; i < exercises.length; i++) {
    total += exercises[i];
  }

  return <strong>total of {total} exercises</strong>;
}

export default Total;
