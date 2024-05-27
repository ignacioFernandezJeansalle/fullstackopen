import Header from "./Header";
import Content from "./Content";

function Course({ course }) {
  const { name, parts } = course;

  return (
    <article>
      <Header name={name} />
      <Content parts={parts} />
    </article>
  );
}

export default Course;
