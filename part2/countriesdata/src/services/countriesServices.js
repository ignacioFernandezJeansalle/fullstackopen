import axios from "axios";

const URL_API_COUNTRIES = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  return axios.get(URL_API_COUNTRIES).then((response) => response.data);
};

export default {
  getAll,
};
