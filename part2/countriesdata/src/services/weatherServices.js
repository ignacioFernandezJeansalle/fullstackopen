import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const get = (lat, lon) => {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  return axios.get(API_URL).then((response) => response.data);
};

export default {
  get,
};
