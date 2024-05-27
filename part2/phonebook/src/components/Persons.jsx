import Person from "./Person";

export default function Persons({ personsToShow }) {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  );
}
