import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course({ course }) {
  const { name, parts } = course;

  const exercises = parts.map((part) => part.exercises);

  return (
    <article>
      <Header name={name} />
      <Content parts={parts} />
      <Total exercises={exercises} />
    </article>
  );
}

export default Course;
