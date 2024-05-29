import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import Message from "./components/Message";
import CountriesList from "./components/CountriesList";
import CountryData from "./components/CountryData";

export default function App() {
  const [message, setMessage] = useState({ message: "Loading", className: "message loading" });
  const [countries, setCountries] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [countriesToShow, setCountriesToShow] = useState(null);
  const [findCountries, setFindCountries] = useState("");

  // get all countries from API
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const newCountries = response.data;
        setCountries(newCountries);
      })
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <>
      <Header />
      <main>
        <form>
          <label htmlFor="input-find-countries">Find countries</label>
          <input id="input-find-countries" type="text" value={findCountries} onChange={handleChangeFindCountries} />
        </form>

        <Message {...message} />
        <CountriesList countries={countriesToShow} />
        <CountryData countryData={countryData} />
      </main>
    </>
  );
}
