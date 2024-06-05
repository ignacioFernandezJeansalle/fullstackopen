import axios from "axios";
//const baseUrl = "http://localhost:3001/api/persons"; Configurado en vite.config.js como proxy
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (newObject) => {
  return axios.put(`${baseUrl}/${newObject.id}`, newObject).then((response) => response.data);
};

export default {
  getAll,
  create,
  remove,
  update,
};
