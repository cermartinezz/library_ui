import axios from "axios";
import { endpoint } from "../config/config";


let Api =  axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type':'application/json',
    'Accept': 'application/json'
  }
});

Api.defaults.withCredentials = true;

export default Api;