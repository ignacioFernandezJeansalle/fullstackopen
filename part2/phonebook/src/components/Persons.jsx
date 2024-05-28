import Person from "./Person";

export default function Persons({ personsToShow, handleRemovePersonOf }) {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} handleRemovePersonOf={handleRemovePersonOf} />
      ))}
    </ul>
  );
}
