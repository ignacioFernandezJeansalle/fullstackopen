import { useState, useEffect } from "react";
import personsServices from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsServices.getAll().then((data) => {
      setPersons(data);
      setPersonsToShow(data);
    });
  }, []);

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

    const newPerson = { name: newName, number: newNumber };
    personsServices.create(newPerson).then((data) => {
      const newPersons = persons.concat(data);
      setPersons(newPersons);

      setNewName("");
      setNewNumber("");
      setFilter("");
      setPersonsToShow(newPersons);
    });
  };

  const handleRemovePersonOf = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsServices.remove(person.id).then((data) => {
        const newPersons = persons.filter((person) => person.id !== data.id);
        setPersons(newPersons);
        setPersonsToShow(newPersons);
      });
    }
  };

  return (
    <main>
      <h1>Phonebook</h1>
      <Filter valueFilter={filter} onChangeFilter={handleChangeNewFilter} />

      <h2>Add a new</h2>
      <PersonForm
        valueName={newName}
        onChangeName={handleChangeNewName}
        valueNumber={newNumber}
        onChangeNumber={handleChangeNewNumber}
        submit={handleSubmitForm}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleRemovePersonOf={handleRemovePersonOf} />
    </main>
  );
}

export default App;
