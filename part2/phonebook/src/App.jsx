import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
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
        {persons.map(({ name, number }, index) => (
          <li key={index}>
            {name} {number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
