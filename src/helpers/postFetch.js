import { useCookies } from "react-cookie";
import { endpoint } from "../config/config";

export default async function asypostFetch(path = "",data = {}, token = null) {
  
  let headers = {
    "Content-Type": "application/json",
    Accept:"application/json"
  }

  if(token){
    headers.Authentication = `Bearer ${token}`
  }

  let url = (path) ? `${endpoint}${path}` : `${endpoint}`

  // const response = fetch(url, {
  //   method: "POST", 
  //   mode: "cors", 
  //   cache: "no-cache", 
  //   credentials: 'include', 
  //   headers,
  //   body: JSON.stringify(data), // body data type must match "Content-Type" header
  // });

  // return response.json(); // parses JSON response into native JavaScript objects
};
