import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);

  const handleChangeNewFilter = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    const newPersonsToShow = !newFilter
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));

    setPersonsToShow(newPersonsToShow);
  };

  const handleChangeNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (!newName) return alert("Please enter a valid name");
    if (!newNumber) return alert("Please enter a valid number");

    if (persons.some((person) => person.name === newName)) return alert(`${newName} is already added to phonebook`);

    const newPersons = persons.concat({ name: newName, number: newNumber });
    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
    setFilter("");
    setPersonsToShow(newPersons);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor="newFilter">filter shown with </label>
        <input id="newFilter" onChange={handleChangeNewFilter} value={filter} />
      </div>

      <h2>Add a new</h2>
      <form>
        <div>
          <label htmlFor="newName">name: </label>
          <input id="newName" onChange={handleChangeNewName} value={newName} />
        </div>
        <div>
          <label htmlFor="newNumber">number: </label>
          <input id="newNumber" onChange={handleChangeNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmitForm}>
            add
          </button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(({ name, number }, index) => (
          <li key={index}>
            {name} {number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
