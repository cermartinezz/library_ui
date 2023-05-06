import axios from "axios";
import { endpoint } from "../config/config";


let Api =  axios.create({
  baseURL: endpoint,
  timeout: 1000,
  headers: {
    'Content-Type':'application/json',
    'Accept': 'application/json'
  }
});

export default Api;