import Cookies from "js-cookie";
import Api from "./api";

export default function getCookie() {
  let token = Cookies.get("XSRF-TOKEN");

  if (token) {
    return new Promise(resolve => {
      resolve(token);
    });
  }

  return Api.get("/csrf-cookie");
};