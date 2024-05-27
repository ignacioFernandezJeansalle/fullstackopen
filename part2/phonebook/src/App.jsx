import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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

    const newPersons = persons.concat({ name: newName, number: newNumber, id: persons.length + 1 });
    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
    setFilter("");
    setPersonsToShow(newPersons);
  };

  return (
    <main>
      <h1>Phonebook</h1>
      <Filter valueFilter={filter} onChangeFilter={handleChangeNewFilter} />

      <h2>Add a new</h2>
      <PersonForm
        valueName={newName}
        onChaneName={handleChangeNewName}
        valueNumber={newNumber}
        onChangeNumber={handleChangeNewNumber}
        submit={handleSubmitForm}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </main>
  );
}

export default App;
