export default function Weather({ weather }) {
  if (!weather) return null;

  const { capital, temperature, wind, iconUrl } = weather;

  return (
    <div className="weather">
      <h3>Weather in {capital}</h3>
      <p>Temperature: {temperature} ºC</p>
      <img src={iconUrl} alt="Weather icon representing the current state" />
      <p>Wind: {wind} m/s</p>
    </div>
  );
}
