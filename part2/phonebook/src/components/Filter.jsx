export default function Filter({ valueFilter, onChangeFilter }) {
  return (
    <div>
      <label htmlFor="newFilter">filter shown with </label>
      <input id="newFilter" onChange={onChangeFilter} value={valueFilter} />
    </div>
  );
}
