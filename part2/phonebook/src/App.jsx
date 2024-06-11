import { useState, useEffect } from "react";
import personsServices from "./services/persons";

import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsServices
      .getAll()
      .then((data) => {
        setPersons(data);
        setPersonsToShow(data);
      })
      .catch((err) => {
        console.log(err);
        handleMessage("Error: could not get data from database", true);
      });
  }, []);

  const handleMessage = (message, error) => {
    setNotificationMessage({ message, error });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

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

    const personFound = persons.find((person) => person.name === newName);
    if (personFound) {
      if (window.confirm(`${personFound.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personUpdate = { ...personFound, number: newNumber };

        personsServices
          .update(personUpdate)
          .then((data) => {
            const newPersons = persons.map((person) => (person.id !== data.id ? person : data));
            setPersons(newPersons);

            setNewName("");
            setNewNumber("");
            setFilter("");
            setPersonsToShow(newPersons);
            handleMessage(`Updated ${data.name}`, false);
          })
          .catch((err) => {
            console.log(err.response.data.error);
            handleMessage(err.response.data.error, true);
          });
      } else {
        return;
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personsServices
        .create(newPerson)
        .then((data) => {
          const newPersons = persons.concat(data);
          setPersons(newPersons);

          setNewName("");
          setNewNumber("");
          setFilter("");
          setPersonsToShow(newPersons);
          handleMessage(`Added ${data.name}`, false);
        })
        .catch((err) => {
          console.log(err.response.data.error);
          handleMessage(err.response.data.error, true);
        });
    }
  };

  const handleRemovePersonOf = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsServices
        .remove(person.id)
        .then((data) => {
          const newPersons = persons.filter((person) => person.id !== data.id);
          setPersons(newPersons);
          setPersonsToShow(newPersons);
        })
        .catch((err) => {
          console.log(err);
          handleMessage("Error: could not delete person", true);
        });
    }
  };

  return (
    <main>
      <h1>Phonebook</h1>
      <Notification {...notificationMessage} />
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
