export default function Countries({ countries }) {
  if (!countries || countries.length === 1) return null;

  return (
    <ul className="list-countries">
      {countries.map((country) => {
        const name = country.name.common;
        return <li key={name}>{name}</li>;
      })}
    </ul>
  );
}
