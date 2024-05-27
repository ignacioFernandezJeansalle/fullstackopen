import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChangeInput = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (newName === "") return alert("Please enter a valid name");

    if (persons.some((person) => person.name === newName)) return alert(`${newName} is already added to phonebook`);

    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <label htmlFor="newName">name: </label>
        <input id="newName" onChange={handleChangeInput} value={newName} />
        <button type="submit" onClick={handleSubmitForm}>
          add
        </button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(({ name }, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
