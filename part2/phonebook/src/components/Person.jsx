export default function Person({ person, handleRemovePersonOf }) {
  const handleClick = () => {
    handleRemovePersonOf(person);
  };

  return (
    <li>
      {person.name} {person.number} <button onClick={handleClick}>delete</button>
    </li>
  );
}
