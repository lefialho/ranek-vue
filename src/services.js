import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000"
})

export const api = {
  get(URL) {
    return axiosInstance.get(URL);
  },
  post(URL, body) {
    return axiosInstance.post(URL, body);
  },
  put(URL, body) {
    return axiosInstance.put(URL, body);
  },
  delete(URL) {
    return axiosInstance.delete(URL);
  }
}

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}