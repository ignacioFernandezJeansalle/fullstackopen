function Header({ name }) {
  return <h2>{name}</h2>;
}

function Content({ parts }) {
  return (
    <ul>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </ul>
  );
}

function Part({ name, exercises }) {
  return (
    <li>
      {name} {exercises}
    </li>
  );
}

function Total({ parts }) {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);

  return <strong>total of {total} exercises</strong>;
}

function Course({ course }) {
  const { name, parts } = course;

  return (
    <article>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </article>
  );
}

export default Course;
