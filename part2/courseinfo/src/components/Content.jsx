import Part from "./Part";

function Content({ parts }) {
  return (
    <ul>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </ul>
  );
}

export default Content;
