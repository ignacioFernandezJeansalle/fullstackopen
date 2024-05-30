export default function CountryData({ countryData }) {
  if (!countryData) return null;

  const { name, capital, area, languages, flags } = countryData;
  const languagesArray = Object.values(languages);

  return (
    <div className="country-data">
      <h2>{name.common}</h2>
      <p>Capital: {capital[0]}</p>
      <p>Area: {area}</p>
      <p>Languages:</p>
      <ul>
        {languagesArray.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
    </div>
  );
}
