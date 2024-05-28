import { useState, useEffect } from "react";
import axios from "axios";

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
    axios.get("http://localhost:3001/persons").then((response) => {
      const data = response.data;
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
    axios.post("http://localhost:3001/persons", newPerson).then((response) => {
      console.log(response);
      const newPersons = persons.concat(response.data);

      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
      setFilter("");
      setPersonsToShow(newPersons);
    });
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
      <Persons personsToShow={personsToShow} />
    </main>
  );
}

export default App;
