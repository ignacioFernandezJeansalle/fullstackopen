export default function PersonForm({ valueName, onChangeName, valueNumber, onChangeNumber, submit }) {
  return (
    <form>
      <div>
        <label htmlFor="newName">name: </label>
        <input id="newName" onChange={onChangeName} value={valueName} />
      </div>
      <div>
        <label htmlFor="newNumber">number: </label>
        <input id="newNumber" onChange={onChangeNumber} value={valueNumber} />
      </div>
      <div>
        <button type="submit" onClick={submit}>
          add
        </button>
      </div>
    </form>
  );
}
