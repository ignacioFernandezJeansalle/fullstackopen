import { useEffect, useState } from "react";
import countriesServices from "./services/countriesServices";
import weatherServices from "./services/weatherServices";

import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import CountriesList from "./components/CountriesList";
import CountryData from "./components/CountryData";
import Weather from "./components/Weather";

export default function App() {
  const [message, setMessage] = useState({ message: "Loading", className: "message loading" });
  const [countries, setCountries] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [countriesToShow, setCountriesToShow] = useState(null);
  const [findCountries, setFindCountries] = useState("");
  const [weather, setWeather] = useState(null);

  // get all countries from API
  useEffect(() => {
    countriesServices
      .getAll()
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // get weather from API
  useEffect(() => {
    if (!countryData) {
      setWeather(null);
      return;
    }

    const { capital, capitalInfo } = countryData;
    const lat = capitalInfo.latlng[0];
    const lon = capitalInfo.latlng[1];

    weatherServices
      .get(lat, lon)
      .then((data) => {
        const temperature = data.main.temp;
        const wind = data.wind.speed;
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const newWeather = { capital: capital[0], temperature, wind, iconUrl };
        setWeather(newWeather);
      })
      .catch((err) => console.log(err));
  }, [countryData]);

  // update countries to show and message
  useEffect(() => {
    if (!countries) return;

    if (findCountries === "") {
      setMessage({ message: "Please enter a filter", className: "message" });
      setCountriesToShow(null);
      setCountryData(null);
      return;
    }

    const newCountriesToShow = countries.filter((country) => {
      const search = country.name.common;
      return search.toLowerCase().includes(findCountries.toLowerCase());
    });

    if (newCountriesToShow.length === 0) {
      setMessage({ message: "There are no results", className: "message" });
      setCountriesToShow(null);
      setCountryData(null);
      return;
    }

    if (newCountriesToShow.length === 1) {
      setMessage(null);
      setCountriesToShow(null);
      setCountryData(newCountriesToShow[0]);
      return;
    }

    if (newCountriesToShow.length > 10) {
      setMessage({ message: "Too many mathces, specify another filter", className: "message" });
      setCountriesToShow(null);
      setCountryData(null);
      return;
    }

    setMessage(null);
    setCountriesToShow(newCountriesToShow);
    setCountryData(null);
  }, [findCountries, countries]);

  const handleChangeFindCountries = (event) => {
    const newFindCountries = event.target.value;
    setFindCountries(newFindCountries);
  };

  const handleClickShowDetails = (name) => {
    setCountriesToShow(null);
    const newCountryData = countriesToShow.filter((country) => {
      return country.name.common === name;
    });
    setCountryData(newCountryData[0]);
  };

  return (
    <>
      <Header />
      <main>
        <SearchForm value={findCountries} onChange={handleChangeFindCountries} message={message} />

        <CountriesList countries={countriesToShow} handleClickShowDetails={handleClickShowDetails} />
        <CountryData countryData={countryData} />
        <Weather weather={weather} />
      </main>
    </>
  );
}
