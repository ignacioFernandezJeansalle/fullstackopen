import Message from "./Message";

export default function SearchForm({ value, onChange, message }) {
  return (
    <form>
      <label htmlFor="input-find-countries">Find countries</label>
      <input id="input-find-countries" type="text" value={value} onChange={onChange} />
      <Message messageObj={message} />
    </form>
  );
}
